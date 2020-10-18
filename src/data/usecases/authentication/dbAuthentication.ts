import {
  Authentication,
  UpdateAccessTokenRepository,
  LoadAccountByEmailRepository,
  AuthenticationModel,
  HashComparer,
  Encrypter
} from './dbAuthenticationProtocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly encrypter: Encrypter
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    encrypter: Encrypter,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.encrypter = encrypter
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  public async auth (authParams: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authParams.email)

    if (account) {
      const isValid = await this.hashComparer.compare(authParams.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }

    return null
  }
}
