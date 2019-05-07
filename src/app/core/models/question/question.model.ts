import { ISerializer } from '../serializer.interface';
import { Translations } from '../translations.model';
import { QuestionChoice } from './question-choice.model';

export class Question implements ISerializer {

  public id : string;
  public query : string;
  public image : string;
  public time : number;
  public choices : QuestionChoice[];
  public translations : Translations;
  public createdAt : Date;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<Question>(data) {
    Object.assign(this as any, data);
    return this;
  }

}