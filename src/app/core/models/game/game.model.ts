import { ISerializer } from '../serializer.interface';
import { Answer } from './answer.model';
import { GameQuestion } from './game-question.model';
import { Member } from './member.model';
import { Winner } from './winner.model';

export class Game implements ISerializer {

  public id : string;
  public name : string;
  public code : string;
  public state : string;
  public currentQuestionId : string;
  public primaryLanguage : string;
  public winners : Winner[];
  public members : Member[];
  public questions : GameQuestion[];
  public answers : Answer[];
  public createdAt : Date;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<Game>(data) {
    Object.assign(this as any, data);
    return this;
  }

}
