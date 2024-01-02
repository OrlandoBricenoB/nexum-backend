import { RepositoryBase } from '../../shared/domain/repositoryBase'
import { AccountSession } from '../domain/accountSession'

export class AccountSessionRepository extends RepositoryBase<AccountSession> {
  constructor() {
    super('account_sessions')
  }

  public async getAccountSession(id: string): Promise<AccountSession | null> {
    return this.getById(id)
  }

  public getAllAccountSessions(): Promise<AccountSession[]> {
    return this.getAll()
  }
}
