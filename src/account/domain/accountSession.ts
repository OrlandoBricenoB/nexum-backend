import { Entity } from '../../shared/domain/entity'

export class AccountSession extends Entity {
  public account_id: string
  public name: string
  public user_agent: string
  public ip: string
  public location: string
  public last_seen_at: Date
  public expired_at: Date

  constructor(
    id: string,
    account_id: string,
    name: string,
    user_agent: string,
    ip: string,
    location: string,
    last_seen_at: Date,
    expired_at: Date
  ) {
    super()

    this.id = id
    this.account_id = account_id
    this.name = name
    this.user_agent = user_agent
    this.ip = ip
    this.location = location
    this.last_seen_at = last_seen_at
    this.expired_at = expired_at
  }
}
