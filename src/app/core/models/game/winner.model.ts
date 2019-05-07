import { ISerializer } from '../serializer.interface';

export class Winner implements ISerializer {

  public userId : string;
  public userName : string;
  public score : number;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<Winner>(data) {
    Object.assign(this as any, data);
    return this;
  }

}