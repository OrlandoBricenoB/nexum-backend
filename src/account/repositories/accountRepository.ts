import { database } from '../../config/databaseConfig'
import { Account } from '../domain/account'

export class AccountRepository {
  private COLLECTION_NAME = 'accounts'

  public async getAccount(id: string): Promise<Account | null> {
    return database.getById<Account>(this.COLLECTION_NAME, id)
  }
}
