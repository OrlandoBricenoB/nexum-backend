import { AccountSession } from '../domain/accountSession'
import { AccountSessionRepository } from '../repositories/accountSessionRepository'

export default class AccountSessionService {
  private accountSessionRepository: AccountSessionRepository

  constructor() {
    this.accountSessionRepository = new AccountSessionRepository()
  }

  public async getAccountSession(id: string): Promise<AccountSession | null> {
    const accountSession = await this.accountSessionRepository.getAccountSession(id)

    return accountSession && AccountSession.create(accountSession)
  }

  public async getSessionsByAccount(account_id: string) {
    const allSessions = await this.accountSessionRepository.getAllAccountSessions()
    const accountSessions = allSessions.filter(session => session.account_id === account_id)

    return accountSessions.map(session => AccountSession.create(session))
  }
}
