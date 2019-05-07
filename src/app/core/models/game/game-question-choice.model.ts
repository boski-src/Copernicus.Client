import { ISerializer } from '../serializer.interface';
import { Translations } from '../translations.model';

export class GameQuestionChoice implements ISerializer {

  public answer : string;
  public isCorrect : boolean;
  public translations : Translations;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<GameQuestionChoice>(data) {
    Object.assign(this as any, data);
    return this;
  }

}