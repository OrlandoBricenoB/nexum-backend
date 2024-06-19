import { AccountSessionData } from '../../shared/domain/entities/accounts/AccountSession'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { AccountSessionRepository } from '../repositories/accountSessionRepository'

export default class AccountSessionService {
  private accountSessionRepository: AccountSessionRepository

  constructor() {
    this.accountSessionRepository = new AccountSessionRepository()
  }

  public async createSession(data: Partial<AccountSessionData>) {
    const accountSession = await this.accountSessionRepository.createSession(data)
    return accountSession as unknown as EntitiesReturnType['AccountSession']
  }

  public async getSessions(data: Pick<AccountSessionData, 'accountId' | 'ip' | 'userAgent'>) {
    const allSessions = await this.accountSessionRepository.getSessions(data)
    return allSessions as unknown as Array<EntitiesReturnType['AccountSession']>
  }

  public async getAccountSession(id: string) {
    const accountSession = await this.accountSessionRepository.getAccountSession(id)
    return accountSession as unknown as EntitiesReturnType['AccountSession']
  }

  public async updateSession(data: Partial<AccountSessionData>) {
    const response = await this.accountSessionRepository.updateSession(data)
    return response as unknown as EntitiesReturnType['AccountSession']
  }
}
