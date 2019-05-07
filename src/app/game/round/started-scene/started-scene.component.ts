import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Game } from '../../../core/models/game/game.model';
import { GameQuestion } from '../../../core/models/game/game-question.model';
import { GamesRepositoryService } from '../../../core/repositories/games-repository.service';
import { GameSignalRService } from '../../game-signalr.service';
import { GameNoMoreQuestions } from 'src/app/core/models/error-codes';
import { CreateAnswerRequest } from 'src/app/core/requests/game/create-answer.request';
import { Answer } from 'src/app/core/models/game/answer.model';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-started-scene',
  templateUrl: './started-scene.component.html',
  styleUrls: ['./started-scene.component.scss']
})
export class StartedSceneComponent implements OnInit, OnDestroy {

  @Input() public game : Game;
  @Input() public isOwner : boolean;

  @Output() public questionChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() public answerCreated: EventEmitter<Answer> = new EventEmitter<Answer>();

  public colors: string[] = ['warning', 'success', 'primary', 'danger', 'info', 'dark'];
  public chartColors = {
    domain: ['#ffc107', '#28a745', '#007bff', '#dc3545', '#17a2b8', '#343a40']
  };

  public totalTime = 0;
  public currentTime = 0;
  public question : GameQuestion = {} as GameQuestion;

  public waiting = false;
  public answered = false;
  public answeredValue = '';
  public answeredCorrect = false;
  public showQuestionAnswer = false;

  public chartData = {};

  public timer;

  constructor(
    private gamesRepository: GamesRepositoryService,
    private gameSignalR: GameSignalRService,
    private sessionService : SessionService
    ) { }

  public getQuestion(id : string) : GameQuestion {
    return this.game.questions.find(x => x.id == id);
  }

  public get getLanguageCode() {
    return this.game.primaryLanguage.toLowerCase();
  }

  public get questionIsSet() : boolean {
    // console.log(this.game.currentQuestionId)
    return this.game.currentQuestionId != '00000000-0000-0000-0000-000000000000';
  }

  public get questionIsLast() : boolean {
    if (!this.game.questions.length) return false;

    return this.game.questions[this.game.questions.length - 1].id == this.game.currentQuestionId;
  }

  public get timerPercent() : number {
    return this.currentTime / this.totalTime * 100;
  }

  public get yourCorrectAnswers() : Answer[] {
    return this.game.answers.filter(x => x.userId == this.sessionService.me.id && x.isCorrect == true);
  }

  public get answersForCurrentQuestion() : Answer[] {
    return this.game.answers.filter(x => x.questionId == this.game.currentQuestionId);
  }

  public updateChartData() {
    const choices = this.getQuestion(this.game.currentQuestionId).choices;
    const answers = this.answersForCurrentQuestion;

    const data = [];

    choices.forEach((c, index) => {
      data.push({
        name: c.answer,
        value: answers.filter(x => x.value == c.answer).length
      });
    });

    this.chartData = data;
  }

  public end() {
    this.gamesRepository.end(this.game.id)
      .subscribe();
  }

  public nextQuestion() {
    this.gamesRepository.nextQuestion(this.game.id)
      .subscribe(() => true, e => {
        if (e.error && e.error.error.code == GameNoMoreQuestions) this.end();
      });
  }

  public answerQuestion(answer : string, isCorrect : boolean) {
    this.answered = true;
    this.answeredCorrect = isCorrect;
    this.answeredValue = answer;
    this.gamesRepository.answerQuestion(this.game.id, new CreateAnswerRequest(this.game.currentQuestionId, answer))
      .subscribe(() => true, () => {
        this.answered = false;
        this.answeredCorrect = false;
      });
  }

  ngOnInit() {
    if (this.questionIsSet) this.waiting = true;
    this.registerOnQuestionChanged();
    this.registerOnAnswerCreated();
  }

  ngOnDestroy() {
    this.unregisterAll();
    clearInterval(this.timer);
    this.game = {} as Game;
  }

  public registerOnQuestionChanged(): void {
    this.gameSignalR.hub.on('QuestionChanged', x => {
      clearInterval(this.timer);

      this.answered = false;
      this.answeredCorrect = false;
      this.answeredValue = '';
      this.showQuestionAnswer = false;
      this.questionChanged.emit(x.questionId);

      this.question = this.getQuestion(x.questionId);
      this.totalTime = this.question.time;
      this.currentTime = this.question.time;
      this.waiting = false;

      this.timer = setInterval(() => {
        this.currentTime -= 1000;
        if (this.currentTime <= 0) {
          clearInterval(this.timer);
          this.updateChartData();
          setTimeout(() => this.showQuestionAnswer = true, 1000);
        }
      }, 1000);
    });
  }

  public registerOnAnswerCreated(): void {
    this.gameSignalR.hub.on('AnswerCreated', x => {
      this.answerCreated.emit(x.answer);
    });
  }

  public unregisterAll() {
    this.gameSignalR.hub.off('QuestionChanged');
    this.gameSignalR.hub.off('AnswerCreated');
  }

}
