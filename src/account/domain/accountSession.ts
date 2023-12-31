export class AccountSession {
  public id: string
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
    this.id = id
    this.account_id = account_id
    this.name = name
    this.user_agent = user_agent
    this.ip = ip
    this.location = location
    this.last_seen_at = last_seen_at
    this.expired_at = expired_at
  }

  public static fields: (keyof AccountSession)[] = [
    'id',
    'account_id',
    'name',
    'user_agent',
    'ip',
    'location',
    'last_seen_at',
    'expired_at'
  ]
}
