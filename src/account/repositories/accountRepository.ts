import { FindQuery } from '../../server/domain/FindQuery'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Account } from '../domain/account'

export class AccountRepository extends RepositoryBase<Account> {
  constructor() {
    super('accounts')
  }

  public async getAccounts(query: FindQuery<Account>): Promise<Account[] | null> {
    return this.getAll(query)
  }

  public async getAccount(id: string): Promise<Account | null> {
    return this.getByID(id)
  }

  public async createAccount(data: Partial<Account>): Promise<boolean> {
    return this.create(data)
  }
}
