import { ChoiceRequest } from './shared/choice-request';
import { TranslationsRequest } from './shared/translations-request';

export class UpdateQuestionRequest {

  constructor(
    public query: string,
    public image : string,
    public time : number,
    public choices : ChoiceRequest[],
    public translations : TranslationsRequest
  ) {}

}
