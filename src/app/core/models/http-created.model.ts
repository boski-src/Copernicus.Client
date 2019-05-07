import { ISerializer } from './serializer.interface';

export class HttpCreated implements ISerializer {

  public id : string;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<HttpCreated>(data) {
    Object.assign(this as any, data);
    return this;
  }

}
