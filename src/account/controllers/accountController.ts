import { Request, Response } from 'express'
import { ControllerBase } from '../../shared/domain/controllerBase'
import AccountSessionService from '../services/accountSessionService'
import { Account } from '../domain/account'
import { isEmpty } from 'lodash'
import { BadRequest, DuplicatedError } from '../../shared/errors/customErrors'
import { AccountSession } from '../domain/accountSession'
import { AccountService } from '../services/accountService'

export default class AccountController extends ControllerBase {
  private accountSessionService: AccountSessionService
  private accountService: AccountService

  constructor() {
    super()

    this.accountSessionService = new AccountSessionService()
    this.accountService = new AccountService()
  }

  public async getAccount(req: Request, res: Response): Promise<void> {
    const account = req.body._account as unknown as Account

    res.json(account.getInfo())
  }

  public async getAccountSessions(req: Request, res: Response): Promise<void> {
    const account = req.body._account as Account

    const allSessions = await this.accountSessionService.getSessions({
      account_id: account.id
    })

    res.send(allSessions.map(session => session.getInfo()))
  }

  public async createAccount(req: Request, res: Response): Promise<void> {
    const data = req.body as Partial<Account>

    data.username = data.username?.toLowerCase().trim()
    data.is_verified = false

    const account = Account.create(data) as Account
    account.generateID()

    if (!account.isComplete()) {
      const error = new BadRequest()
      res.status(error.status).send({ error })
      return
    }

    const duplicated = await this.accountService.getDuplicatedFields(account)
    if (duplicated.length > 0) {
      const error = new DuplicatedError(duplicated)
      res.status(error.status).send({ error })
      return
    }

    await this.accountService.createAccount(account)

    res.status(201).send(account.getInfo())
  }

  public async selectSessionCharacter(req: Request, res: Response): Promise<void> {
    const { character_id, _session } = req.body as { character_id: string; _session: AccountSession }

    if (isEmpty(character_id)) {
      const error = new BadRequest()
      res.status(error.status).send({ error })
      return
    }

    await this.accountSessionService.updateSession({ id: _session.id, character_id })

    res.json({ character_id })
  }
}
