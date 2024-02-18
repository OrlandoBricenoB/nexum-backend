import { FindQuery } from '../../server/domain/FindQuery'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { AccountSession } from '../domain/accountSession'

export class AccountSessionRepository extends RepositoryBase<AccountSession> {
  constructor() {
    super('account_sessions')
  }

  public async createSession(data: Partial<AccountSession>): Promise<boolean> {
    return this.create(data)
  }

  public async getAccountSession(id: string): Promise<AccountSession | null> {
    return this.getByID(id)
  }

  public getAllAccountSessions(query?: FindQuery<AccountSession>): Promise<AccountSession[]> {
    return this.getAll(query)
  }

  public async updateSession(data: Partial<AccountSession>): Promise<AccountSession | null> {
    if (!data.id) return null
    return this.update(data.id, data)
  }
}
