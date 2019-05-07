export class CreateGameRequest {

  constructor (
    public name : string,
    public primaryLanguage : string,
    public maxQuestions : number
  ) {}

}
