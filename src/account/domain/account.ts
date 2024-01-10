import { omit } from 'lodash'
import { Entity } from '../../shared/domain/entity'

export class Account extends Entity {
  public username: string
  public password: string
  public email: string
  public image: string
  public is_verified: string

  constructor(id: string, username: string, password: string, email: string, image: string, is_verified: string) {
    super()

    this.username = username
    this.password = password
    this.email = email
    this.image = image
    this.is_verified = is_verified
  }

  private static privateFields = ['password']

  public getInfo() {
    return omit({ ...this }, Account.privateFields)
  }
}
