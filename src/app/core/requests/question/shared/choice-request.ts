import { TranslationsRequest } from './translations-request';

export class ChoiceRequest {

  constructor(
    public answer: string,
    public IsCorrect : boolean,
    public translations : TranslationsRequest
  ) {}

}