import { BadRequest, Unauthorized } from '../../shared/errors/customErrors'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { AccountService } from '../../account/services/accountService'
import AccountSessionService from '../../account/services/accountSessionService'
import { isEmpty } from 'lodash'
import { HonoContext } from '../../server/types/HonoContext'

export class AuthController extends ControllerBase {
  private accountService: AccountService
  private accountSessionService: AccountSessionService

  constructor() {
    super()

    this.accountService = new AccountService()
    this.accountSessionService = new AccountSessionService()
  }

  public async login(ctx: HonoContext<'/login'>) {
    const data = (await ctx.req.json()) as {
      username: string
      password: string
    }

    try {
      if (!data?.username || !data?.password) {
        const badRequestError = new BadRequest()
        return ctx.json(
          {
            ok: false,
            error: badRequestError,
          },
          badRequestError.status
        )
      }

      const username = data?.username.toLowerCase().trim()

      const account = await this.accountService.getAccountByUsername(username)
      if (account) {
        // * Check password
        if (account.password !== data.password) {
          const unauthorizedError = new Unauthorized('WRONG_DATA')
          return ctx.json(
            {
              ok: false,
              error: unauthorizedError,
            },
            unauthorizedError.status
          )
        }

        // * Make Account Session
        const ip = ctx.req.header('X-Client-IP') || ''

        const [existentSession] = await this.accountSessionService.getSessions({
          accountId: account.id,
          ip,
        })
        let sessionId = existentSession?.id || ''

        if (isEmpty(existentSession)) {
          const createdSession = await this.accountSessionService.createSession({
            ip,
            expiredAt: new Date(Date.now() + 86400000), // 1 day of expiration
            lastSeenAt: new Date(),
            accountId: account.id,
            name: '',
          })
          sessionId = createdSession.id
        } else {
          // * Update Last Seen At if have not account session.
          this.accountSessionService.updateSession({
            id: existentSession?.id,
            expiredAt: new Date(Date.now() + 86400000),
            lastSeenAt: new Date(),
          })
        }

        return ctx.json({
          ok: true,
          sessionId: isEmpty(existentSession) ? sessionId : existentSession?.id,
        })
      } else {
        const unauthorizedError = new Unauthorized('WRONG_DATA')
        return ctx.json(
          {
            ok: false,
            error: unauthorizedError,
          },
          unauthorizedError.status
        )
      }
    } catch (error) {
      console.log(error)
      return ctx.json(
        {
          ok: false,
          error,
        },
        500
      )
    }
  }
}
