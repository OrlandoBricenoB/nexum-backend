import { Entity } from '../../shared/domain/entity'

export class Account extends Entity {
  public id: string
  public username: string
  public password: string
  public email: string
  public image: string
  public is_verified: boolean
  private static privateFields: string[] = ['password']
  private static uniqueFields: string[] = ['email', 'username']

  constructor(id: string, username: string, password: string, email: string, image: string, is_verified: boolean) {
    super()

    this.id = id
    this.username = username
    this.password = password
    this.email = email
    this.image = image
    this.is_verified = is_verified
  }

  protected getPrivateFields(): string[] {
    return Account.privateFields
  }

  public getUniqueFields(): string[] {
    return Account.uniqueFields
  }
}
