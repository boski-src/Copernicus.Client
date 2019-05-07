import { ISerializer } from '../serializer.interface';
import { Translations } from '../translations.model';
import { GameQuestionChoice } from './game-question-choice.model';

export class GameQuestion implements ISerializer {

  public id : string;
  public orderIndex : number;
  public query : string;
  public image : string;
  public time : number;
  public choices : GameQuestionChoice[];
  public translations : Translations;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<GameQuestion>(data) {
    Object.assign(this as any, data);
    return this;
  }

}