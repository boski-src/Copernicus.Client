import { ISerializer } from './serializer.interface';

export class Auth implements ISerializer {

  public token : string;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<Auth>(data) {
    Object.assign(this as any, data);
    return this;
  }

}
