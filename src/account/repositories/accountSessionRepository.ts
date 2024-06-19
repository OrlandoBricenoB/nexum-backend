import { and, eq } from 'drizzle-orm'
import { database } from '../../config/databaseConfig'
import {
  AccountSession,
  AccountSessionData,
} from '../../shared/domain/entities/accounts/AccountSession'
import { accountSessions } from '../../shared/domain/schemas/accounts/accountSessions'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'

export class AccountSessionRepository extends RepositoryBase<'AccountSession'> {
  constructor() {
    super(accountSessions, AccountSession)
  }

  public async createSession(data: Partial<AccountSessionData>) {
    return this.create(data)
  }

  public async getAccountSession(id: string) {
    return this.getById(id)
  }

  public async getSessions(data: Pick<AccountSessionData, 'accountId' | 'ip' | 'userAgent'>) {
    const results = await database
      .select()
      .from(accountSessions)
      .where(
        and(
          eq(accountSessions.accountId, data.accountId),
          eq(accountSessions.ip, data.ip),
          eq(accountSessions.userAgent, data.userAgent)
        )
      )
      .execute()

    return results.map((session) => AccountSession(session))
  }

  public async updateSession(data: Partial<AccountSessionData>) {
    if (!data.id) return null
    return this.update(data.id, data)
  }
}
