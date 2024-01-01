import { Request, Response } from 'express'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { AccountService } from '../services/accountService'
import AccountSessionService from '../services/accountSessionService'
import { NotFound, Unauthorized } from '../../shared/errors/customErrors'
import { pick } from 'lodash'
import { Account } from '../domain/account'
import { AccountSession } from '../domain/accountSession'

export default class AccountController extends ControllerBase {
  private accountService: AccountService
  private accountSessionService: AccountSessionService

  constructor() {
    super()

    this.accountService = new AccountService()
    this.accountSessionService = new AccountSessionService()
  }

  public async getAccount(req: Request, res: Response): Promise<void> {
    const session_id = req.headers['authorization']

    if (!session_id) {
      const missingAuthorizationHeaderError = new Unauthorized('MISSING_AUTHORIZATION_HEADER')

      res.status(missingAuthorizationHeaderError.status).send({ error: missingAuthorizationHeaderError })

      return
    }

    const accountSession = await this.accountSessionService.getAccountSession(session_id)

    if (!accountSession) {
      const accountSessionNotFoundError = new NotFound('ACCOUNT_SESSION_NOT_FOUND')

      res.status(accountSessionNotFoundError.status).send({ error: accountSessionNotFoundError })

      return
    }

    const account = await this.accountService.getAccount(accountSession.account_id)

    if (!account) {
      const accountNotFoundError = new NotFound('ACCOUNT_NOT_FOUND')

      res.status(accountNotFoundError.status).send({ error: accountNotFoundError })

      return
    }

    res.send(pick(account, Account.getPublicFields()))
  }

  public async getAccountSessions(req: Request, res: Response): Promise<void> {
    const session_id = req.headers['authorization']

    if (!session_id) {
      const missingAuthorizationHeaderError = new Unauthorized('MISSING_AUTHORIZATION_HEADER')

      res.status(missingAuthorizationHeaderError.status).send({ error: missingAuthorizationHeaderError })

      return
    }

    const accountSession = await this.accountSessionService.getAccountSession(session_id)

    if (!accountSession) {
      const accountSessionNotFoundError = new NotFound('ACCOUNT_SESSION_NOT_FOUND')

      res.status(accountSessionNotFoundError.status).send({ error: accountSessionNotFoundError })

      return
    }

    const allSessions = await this.accountSessionService.getSessionsByAccount(accountSession.account_id)

    res.send(allSessions.map(session => pick(session, AccountSession.fields)))
  }
}
