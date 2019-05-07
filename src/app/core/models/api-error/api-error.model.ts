import { ISerializer } from '../serializer.interface';
import { ApiErrorDetails } from './api-error-details';

export class ApiError implements ISerializer {

  public status : number;
  public error : ApiErrorDetails;

  constructor(data : any) {
    this.deserialize(data);
  }

  public deserialize<ApiError>(data) {
    Object.assign(this as any, data);
    return this;
  }

}