import { isEmpty } from 'lodash'
import { Account } from '../domain/account'
import { AccountRepository } from '../repositories/accountRepository'
import { FindQuery } from '../../server/domain/FindQuery'

export class AccountService {
  private accountRepository: AccountRepository

  constructor() {
    this.accountRepository = new AccountRepository()
  }

  public async getAccounts(query: FindQuery<Account>): Promise<Account | null> {
    const accounts = await this.accountRepository.getAccounts(query)

    if (!accounts || isEmpty(accounts)) return null

    return Account.create(accounts[0])
  }

  public async getAccount(id: string): Promise<Account | null> {
    const account = await this.accountRepository.getAccount(id)

    return Account.create(account)
  }

  public async createAccount(data: Partial<Account>): Promise<boolean> {
    const response = await this.accountRepository.createAccount(data)

    return response
  }
}
