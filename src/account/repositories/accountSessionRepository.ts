import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { AccountSession } from '../domain/accountSession'

export class AccountSessionRepository extends RepositoryBase<AccountSession> {
  constructor() {
    super('account_sessions')
  }

  public async getAccountSession(id: string): Promise<AccountSession | null> {
    return this.getByID(id)
  }

  public getAllAccountSessions(): Promise<AccountSession[]> {
    return this.getAll()
  }
}
