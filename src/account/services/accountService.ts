import { AccountRepository } from '../repositories/accountRepository'
import { Account, AccountData } from '../../shared/domain/entities/accounts/Account'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { Database } from '../../shared/types/Database'

export const AccountService = (db: Database) => {
  const accountRepository = new AccountRepository(db)

  const getAccounts = async () => {
    const account = await accountRepository.getAccounts()
    return account as unknown as Array<EntitiesReturnType['Account']>
  }

  const getAccount = async (id: string) => {
    const account = await accountRepository.getAccount(id)
    return account as unknown as EntitiesReturnType['Account']
  }

  const getAccountByUsername = async (username: string): Promise<EntitiesReturnType['Account']> => {
    const [account] = await accountRepository.getAccountByUsername(username)
    return account as unknown as EntitiesReturnType['Account']
  }

  const createAccount = async (data: Partial<AccountData>) => {
    const response = await accountRepository.createAccount(data)
    return response as unknown as EntitiesReturnType['Account']
  }

  const getDuplicatedFields = async (account: ReturnType<typeof Account>) => {
    const duplicated = await accountRepository.getDuplicatedFields(account)
    return duplicated
  }

  return {
    getAccounts,
    getAccount,
    getAccountByUsername,
    createAccount,
    getDuplicatedFields,
  }
}
