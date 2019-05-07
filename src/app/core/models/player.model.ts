import { ISerializer } from './serializer.interface';

export class Player implements ISerializer {

  public id : string;
  public userId : string;
  public userName : string;
  public winGames : number;
  public totalGames : number;
  public score : number;
  public createdAt : Date;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<Provider>(data) {
    Object.assign(this as any, data);
    return this;
  }

}