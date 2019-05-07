import { ISerializer } from '../serializer.interface';

export class ApiErrorDetails implements ISerializer {

  public code : string;
  public message : string;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<ApiErrorDetails>(data) {
    Object.assign(this as any, data);
    return this;
  }

}