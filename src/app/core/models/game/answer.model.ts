import { ISerializer } from '../serializer.interface';

export class Answer implements ISerializer {

  public questionId : string;
  public userId : string;
  public userName : string;
  public value : string;
  public isCorrect : boolean;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<Answer>(data) {
    Object.assign(this as any, data);
    return this;
  }

}