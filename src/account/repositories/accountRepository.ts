import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Account } from '../domain/account'

export class AccountRepository extends RepositoryBase<Account> {
  constructor() {
    super('accounts')
  }

  public async getAccount(id: string): Promise<Account | null> {
    return this.getByID(id)
  }
}
