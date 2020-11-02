import { SignUpController } from '../../../../../presentation/controllers/sign/signup/signupController'
import { Controller } from '../../../../../presentation/protocols'
import { MakeSignUpValidation } from './signupValidationFactory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/dbAuthenticationFactory'
import { makeDbAddAccount } from '../../../usecases/account/addAccount/dbAddAccountFactory'
import { makeLogControllerDecorator } from '../../../decorators/logControllerDecoratorFactory'

export const MakeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), MakeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
