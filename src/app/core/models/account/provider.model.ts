import { ISerializer } from '../serializer.interface';

export class Provider implements ISerializer {

  public id : string;
  public name : string;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<Provider>(data) {
    Object.assign(this as any, data);
    return this;
  }

}