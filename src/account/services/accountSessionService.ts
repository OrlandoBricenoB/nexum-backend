import { FindQuery } from '../../server/domain/FindQuery'
import { AccountSession } from '../domain/accountSession'
import { AccountSessionRepository } from '../repositories/accountSessionRepository'

export default class AccountSessionService {
  private accountSessionRepository: AccountSessionRepository

  constructor() {
    this.accountSessionRepository = new AccountSessionRepository()
  }

  public async createSession(data: Partial<AccountSession>): Promise<boolean> {
    const accountSession = await this.accountSessionRepository.createSession(data)
    return accountSession
  }

  public async getSessions(query: FindQuery<AccountSession>): Promise<AccountSession[]> {
    const allSessions = await this.accountSessionRepository.getAllAccountSessions(query)
    return allSessions
  }

  public async getAccountSession(id: string): Promise<AccountSession | null> {
    const accountSession = await this.accountSessionRepository.getAccountSession(id)

    return AccountSession.create(accountSession)
  }

  public async updateSession(data: Partial<AccountSession>): Promise<AccountSession | null> {
    const response = await this.accountSessionRepository.updateSession(data)

    return response
  }
}
