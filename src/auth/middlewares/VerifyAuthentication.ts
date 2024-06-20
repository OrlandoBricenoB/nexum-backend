import { Unauthorized } from '../../shared/errors/customErrors'
import { AccountSessionService } from '../../account/services/accountSessionService'
import { isEmpty } from 'lodash'
import { AccountService } from '../../account/services/accountService'
import { HonoContext } from '../../server/types/HonoContext'
import { Next } from 'hono'
import { connect } from '../../config/databaseConfig'

export const VerifyAuthentication = async (ctx: HonoContext<'/verify'>, next: Next) => {
  const authorization = ctx.req.header('Authorization') || ''

  const sessionId = (authorization || '').split('Bearer ').pop()?.trim()
  console.log({ sessionId })

  if (!sessionId || sessionId === 'null' || sessionId === 'undefined') {
    const unauthorizedError = new Unauthorized('NEED_SESSION')
    return ctx.json(
      {
        ok: false,
        error: unauthorizedError,
      },
      unauthorizedError.status
    )
  }

  const db = await connect(ctx.env.DATABASE_URL)
  const sesssionAccountService = AccountSessionService(db)
  const session = await sesssionAccountService.getSession(sessionId)

  if (isEmpty(session)) {
    const unauthorizedError = new Unauthorized('ERROR_INVALID_SESSION')
    return ctx.json(
      {
        ok: false,
        error: unauthorizedError,
      },
      unauthorizedError.status
    )
  }

  // * Refresh last seen after 2 minutes from the last update.
  const lastSeenWithExtra = new Date(session.lastSeenAt).getTime() + 120000

  // * If Date.now() is after last seen with extra time, refresh last seen.
  if (new Date().getTime() - lastSeenWithExtra) {
    const updatedSession = {
      expiredAt: new Date(Date.now() + 86400000),
      lastSeenAt: new Date(),
    }
    await sesssionAccountService.updateSession(updatedSession)

    session.expiredAt = new Date(Date.now() + 86400000)
    session.lastSeenAt = new Date()
  }

  const accountService = AccountService(db)
  const account = await accountService.getAccount(session.accountId)

  if (isEmpty(account)) {
    const unauthorizedError = new Unauthorized('ERROR_INVALID_SESSION')
    return ctx.json(
      {
        ok: false,
        error: unauthorizedError,
      },
      unauthorizedError.status
    )
  }

  ctx.set('accountId', account.id)
  ctx.set('sessionId', session.id)
  ctx.set('characterId', session.characterId || '')
  return next()
}
