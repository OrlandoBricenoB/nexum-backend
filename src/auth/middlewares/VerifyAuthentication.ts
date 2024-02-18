import { RequestHandler } from 'express'
import { Unauthorized } from '../../shared/errors/customErrors'
import AccountSessionService from '../../account/services/accountSessionService'
import { isEmpty } from 'lodash'
import { AccountService } from '../../account/services/accountService'

export const VerifyAuthentication: RequestHandler = async (req, res, next) => {
  const authorization = req.headers.authorization as string
  const sessionId = (authorization || '').split('Bearer ').pop()?.trim()
  console.log({ sessionId })
  if (!sessionId || sessionId === 'null' || sessionId === 'undefined') {
    const unauthorizedError = new Unauthorized('NEED_SESSION')
    res.status(unauthorizedError.status).json({
      error: unauthorizedError
    })
    return
  }

  const sesssionAccountService = new AccountSessionService()
  const session = await sesssionAccountService.getAccountSession(sessionId)

  if (isEmpty(session)) {
    const unauthorizedError = new Unauthorized('ERROR_INVALID_SESSION')
    res.status(unauthorizedError.status).json({
      error: unauthorizedError
    })
    return
  }

  // * Refresh last seen after 2 minutes from the last update.
  const lastSeenWithExtra = new Date(session.last_seen_at).getTime() + 120000

  // * If Date.now() is after last seen with extra time, refresh last seen.
  if (new Date().getTime() - lastSeenWithExtra) {
    const updatedSession = {
      expired_at: new Date(Date.now() + 86400000),
      last_seen_at: new Date()
    }
    await sesssionAccountService.updateSession(updatedSession)

    session.expired_at = new Date(Date.now() + 86400000)
    session.last_seen_at = new Date()
  }

  const accountService = new AccountService()
  const account = await accountService.getAccount(session.account_id)

  if (isEmpty(account)) {
    const unauthorizedError = new Unauthorized('ERROR_INVALID_SESSION')
    res.status(unauthorizedError.status).json({
      error: unauthorizedError
    })
    return
  }

  req.body._account = account
  req.body._sessionId = session.id
  next()
}
