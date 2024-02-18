import { Request, Response } from 'express'
import { ControllerBase } from '../../shared/domain/controllerBase'
import AccountSessionService from '../services/accountSessionService'
import { Account } from '../domain/account'

export default class AccountController extends ControllerBase {
  private accountSessionService: AccountSessionService

  constructor() {
    super()

    this.accountSessionService = new AccountSessionService()
  }

  public async getAccount(req: Request, res: Response): Promise<void> {
    const account = req.body._account as unknown as Account

    res.json(account.getInfo())
  }

  public async getAccountSessions(req: Request, res: Response): Promise<void> {
    const account = req.body._account as unknown as Account

    const allSessions = await this.accountSessionService.getSessions({
      account_id: account?.id
    })

    res.send(allSessions.map(session => session.getInfo()))
  }
}
