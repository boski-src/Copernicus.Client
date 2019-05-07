import { ISerializer } from './serializer.interface';

export class User implements ISerializer {

  public id : string;
  public name : string;
  public firstName : string;
  public lastName : string;
  public avatarUrl : string;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<User>(data) {
    Object.assign(this as any, data);
    return this;
  }

}
