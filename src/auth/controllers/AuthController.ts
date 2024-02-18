import { Request, Response } from 'express'
import { Unauthorized } from '../../shared/errors/customErrors'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { AccountService } from '../../account/services/accountService'
import AccountSessionService from '../../account/services/accountSessionService'
import { v4 } from 'uuid'
import { isEmpty } from 'lodash'

export class AuthController extends ControllerBase {
  private accountService: AccountService
  private accountSessionService: AccountSessionService

  constructor() {
    super()

    this.accountService = new AccountService()
    this.accountSessionService = new AccountSessionService()
  }

  public async login(req: Request, res: Response): Promise<void> {
    const data = req.body as {
      username: string
      password: string
    }
    const username = data.username.toLowerCase().trim()

    try {
      const account = await this.accountService.getAccounts({
        username
      })

      if (account) {
        // * Check password
        if (account.password !== data.password) {
          const unauthorizedError = new Unauthorized('WRONG_DATA')
          res.status(unauthorizedError.status).send({ error: unauthorizedError })
          return
        }

        // * Make Account Session
        const sessionId = v4()
        const [existentSession] = await this.accountSessionService.getSessions({
          account_id: account.id,
          ip: req.ip,
          user_agent: req.headers['user-agent']
        })

        if (isEmpty(existentSession)) {
          this.accountSessionService.createSession({
            id: sessionId,
            ip: req.ip,
            user_agent: req.headers['user-agent'] || '',
            expired_at: new Date(Date.now() + 86400000), // 1 day of expiration
            last_seen_at: new Date(),
            account_id: account.id,
            location: '',
            name: ''
          })
        } else {
          // * Update Last Seen At if have not account session.
          this.accountSessionService.updateSession({
            id: existentSession?.id,
            expired_at: new Date(Date.now() + 86400000),
            last_seen_at: new Date()
          })
        }

        res.json({
          ok: true,
          account,
          sessionId: isEmpty(existentSession) ? sessionId : existentSession?.id
        })
      } else {
        const unauthorizedError = new Unauthorized('WRONG_DATA')
        res.status(unauthorizedError.status).send({ error: unauthorizedError })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({ error })
    }
  }
}
