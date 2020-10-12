import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './requiredFieldValidation'

describe('RequiredField Validation', () => {
  test('Shoudl return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name ' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
