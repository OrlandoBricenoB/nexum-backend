import { Account } from '../domain/account'
import { AccountRepository } from '../repositories/accountRepository'

export class AccountService {
  private accountRepository: AccountRepository

  constructor() {
    this.accountRepository = new AccountRepository()
  }

  public async getAccount(id: string): Promise<Account | null> {
    return this.accountRepository.getAccount(id)
  }
}
