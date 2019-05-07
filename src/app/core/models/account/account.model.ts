import { ISerializer } from '../serializer.interface';
import { Provider } from './provider.model';

export class Account implements ISerializer {

  public id : string;
  public name : string;
  public email : string;
  public firstName : string;
  public lastName : string;
  public provider : Provider;
  public role : string;
  public avatarUrl : string;
  public createdAt : Date;
  public updatedAt : Date;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<Account>(data) {
    Object.assign(this as any, data);
    return this;
  }

}
