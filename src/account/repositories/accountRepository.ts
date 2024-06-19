import { sql } from 'drizzle-orm'
import { accounts } from '../../shared/domain/domains'
import { Account, AccountData } from '../../shared/domain/entities/accounts/Account'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Database } from '../../shared/types/Database'

export class AccountRepository extends RepositoryBase<'Account'> {
  constructor(db: Database) {
    super(accounts, Account, db)
  }

  public async getAccounts() {
    const results = await this.db.select().from(accounts).execute()
    return results.map((result) => Account(result))
  }

  public async getAccount(id: string) {
    return this.getById(id)
  }

  public async getAccountByUsername(username: string) {
    return this.getBySQL(sql`${accounts.username} = ${username}`)
  }

  public async createAccount(data: Partial<AccountData>) {
    return this.create(data)
  }
}
