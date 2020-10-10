import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/httpHelper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signupProtocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  public async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
      }
      if (!password) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
