import { AccountSessionData } from '../../shared/domain/entities/accounts/AccountSession'
import { Database } from '../../shared/types/Database'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { AccountSessionRepository } from '../repositories/accountSessionRepository'

export const AccountSessionService = (db: Database) => {
  const accountSessionRepository = new AccountSessionRepository(db)

  const createSession = async (data: Partial<AccountSessionData>) => {
    const accountSession = await accountSessionRepository.createSession(data)
    return accountSession as EntitiesReturnType['AccountSession']
  }

  const getSessions = async (data: Pick<AccountSessionData, 'accountId' | 'ip'>) => {
    const allSessions = await accountSessionRepository.getSessions(data)
    return allSessions as Array<EntitiesReturnType['AccountSession']>
  }

  const getSession = async (id: string) => {
    const accountSession = await accountSessionRepository.getSession(id)
    return accountSession as EntitiesReturnType['AccountSession']
  }

  const updateSession = async (data: Partial<AccountSessionData>) => {
    const response = await accountSessionRepository.updateSession(data)
    return response as EntitiesReturnType['AccountSession']
  }

  return {
    createSession,
    getSessions,
    getSession,
    updateSession,
  }
}
