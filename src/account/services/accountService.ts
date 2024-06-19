import { AccountRepository } from '../repositories/accountRepository'
import { Account, AccountData } from '../../shared/domain/entities/accounts/Account'
import { EntitiesReturnType } from '../../shared/types/Entities'

export class AccountService {
  private accountRepository: AccountRepository

  constructor() {
    this.accountRepository = new AccountRepository()
  }

  public async getAccount(id: string) {
    const account = await this.accountRepository.getAccount(id)
    return account as unknown as EntitiesReturnType['Account']
  }

  public async getAccountByUsername(username: string): Promise<EntitiesReturnType['Account']> {
    const [account] = await this.accountRepository.getAccountByUsername(username)
    return account as unknown as EntitiesReturnType['Account']
  }

  public async createAccount(data: Partial<AccountData>) {
    const response = await this.accountRepository.createAccount(data)
    return response as unknown as EntitiesReturnType['Account']
  }

  public async getDuplicatedFields(account: ReturnType<typeof Account>) {
    const duplicated = await this.accountRepository.getDuplicatedFields(account)
    return duplicated
  }
}
