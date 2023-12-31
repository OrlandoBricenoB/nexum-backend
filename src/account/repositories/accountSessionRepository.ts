import { database } from '../../config/databaseConfig'
import { AccountSession } from '../domain/accountSession'

export class AccountSessionRepository {
  private COLLECTION_NANE = 'account_sessions'

  public async getAccountSession(id: string): Promise<AccountSession | null> {
    return database.getById<AccountSession>(this.COLLECTION_NANE, id)
  }

  public getAllAccountSessions(): Promise<AccountSession[]> {
    return database.getAll<AccountSession>(this.COLLECTION_NANE)
  }
}
