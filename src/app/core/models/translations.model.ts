import { ISerializer } from './serializer.interface';

export class Translations implements ISerializer {

  public pl : string;
  public en : string;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<Translations>(data) {
    Object.assign(this as any, data);
    return this;
  }

}
