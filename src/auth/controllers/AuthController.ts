import { BadRequest, Unauthorized } from '../../shared/errors/customErrors'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { AccountService } from '../../account/services/accountService'
import { isEmpty } from 'lodash'
import { HonoContext } from '../../server/types/HonoContext'
import { connect } from '../../config/databaseConfig'
import { AccountSessionService } from '../../account/services/accountSessionService'

export class AuthController extends ControllerBase {
  constructor() {
    super()
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

      const db = await connect(ctx.env.DATABASE_URL)

      const username = data?.username.toLowerCase().trim()

      const account = await AccountService(db).getAccountByUsername(username)
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
        const accountSessionService = AccountSessionService(db)

        const ip = ctx.req.raw.headers.get('CF-Connecting-IP') || ''

        const [existentSession] = await accountSessionService.getSessions({
          accountId: account.id,
          ip,
        })
        let sessionId = existentSession?.id || ''

        if (isEmpty(existentSession)) {
          const createdSession = await accountSessionService.createSession({
            ip,
            expiredAt: new Date(Date.now() + 86400000), // 1 day of expiration
            lastSeenAt: new Date(),
            accountId: account.id,
            name: '',
          })
          sessionId = createdSession.id
        } else {
          // * Update Last Seen At if have not account session.
          accountSessionService.updateSession({
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

  public async selectCharacter(ctx: HonoContext<'/select-character'>) {
    const { characterId } = (await ctx.req.json()) as {
      characterId: string
    }
    const sessionId = ctx.get('sessionId')

    try {
      if (!characterId) {
        const badRequestError = new BadRequest()
        return ctx.json(
          {
            ok: false,
            error: badRequestError,
          },
          badRequestError.status
        )
      }

      const db = await connect(ctx.env.DATABASE_URL)

      const accountSessionService = AccountSessionService(db)

      const updatedSession = await accountSessionService.updateSession({
        id: sessionId,
        characterId,
      })

      return ctx.json({
        ok: true,
        sessionId: isEmpty(updatedSession) ? sessionId : updatedSession?.id,
      })
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
