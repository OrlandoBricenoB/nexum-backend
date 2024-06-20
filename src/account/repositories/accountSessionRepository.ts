import { and, eq } from 'drizzle-orm'
import {
  AccountSession,
  AccountSessionData,
} from '../../shared/domain/entities/accounts/AccountSession'
import { accountSessions } from '../../shared/domain/schemas/accounts/accountSessions'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Database } from '../../shared/types/Database'

export class AccountSessionRepository extends RepositoryBase<'AccountSession'> {
  constructor(db: Database) {
    super(accountSessions, AccountSession, db)
  }

  public async createSession(data: Partial<AccountSessionData>) {
    return this.create(data)
  }

  public async getSession(id: string) {
    return this.getById(id)
  }

  public async getSessions(data: Pick<AccountSessionData, 'accountId' | 'ip'>) {
    const results = await this.db
      .select()
      .from(accountSessions)
      .where(and(eq(accountSessions.accountId, data.accountId), eq(accountSessions.ip, data.ip)))
      .execute()

    return results.map((session) => AccountSession(session))
  }

  public async updateSession(data: Partial<AccountSessionData>) {
    if (!data.id) return null
    return this.update(data.id, data)
  }
}
