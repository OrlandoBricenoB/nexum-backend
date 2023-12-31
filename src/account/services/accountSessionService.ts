import { AccountSession } from '../domain/accountSession'
import { AccountSessionRepository } from '../repositories/accountSessionRepository'

export default class AccountSessionService {
  private accountSessionRepository: AccountSessionRepository

  constructor() {
    this.accountSessionRepository = new AccountSessionRepository()
  }

  public async getAccountSession(id: string): Promise<AccountSession | null> {
    return this.accountSessionRepository.getAccountSession(id)
  }

  public async getSessionsByAccount(account_id: string) {
    const allSessions = await this.accountSessionRepository.getAllAccountSessions()

    return allSessions.filter(session => session.account_id === account_id)
  }
}
