import { ISerializer } from '../serializer.interface';

export class Member implements ISerializer {

  public userId : string;
  public userName : string;
  public userAvatarUrl : string;
  public isCreator : boolean;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<Member>(data) {
    Object.assign(this as any, data);
    return this;
  }

}