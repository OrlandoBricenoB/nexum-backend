import { ControllerBase } from '../../shared/domain/controllerBase'
import { AccountSessionService } from '../services/accountSessionService'
import { isEmpty } from 'lodash'
import { BadRequest, DuplicatedError } from '../../shared/errors/customErrors'
import { AccountService } from '../services/accountService'
import { HonoContext } from '../../server/types/HonoContext'
import { Account, AccountData } from '../../shared/domain/entities/accounts/Account'
import { connect } from '../../config/databaseConfig'

export default class AccountController extends ControllerBase {
  constructor() {
    super()
  }

  public async getAccount(ctx: HonoContext<'/'>) {
    const accountId = ctx.get('accountId')

    return ctx.json({
      id: accountId,
    })
  }

  public async getAccountSessions(ctx: HonoContext<'/sessions'>) {
    const db = await connect(ctx.env.DATABASE_URL)
    const accountId = ctx.get('accountId')

    const allSessions = await AccountSessionService(db).getSessions({
      accountId,
      ip: ctx.req.raw.headers.get('CF-Connecting-IP') || '',
    })

    return ctx.json(allSessions.map((session) => session.getInfo()))
  }

  public async createAccount(ctx: HonoContext<'/create'>) {
    const data = (await ctx.req.json()) as Partial<AccountData>

    const account = Account({
      ...data,
      username: data.username?.toLowerCase().trim(),
      isVerified: false,
      image: '',
    })

    if (!account.isComplete()) {
      const error = new BadRequest()
      return ctx.json(
        {
          ok: false,
          error,
        },
        error.status
      )
    }

    const db = await connect(ctx.env.DATABASE_URL)
    const accountService = AccountService(db)

    const duplicated = await accountService.getDuplicatedFields(account)
    if (duplicated.length > 0) {
      const error = new DuplicatedError(duplicated)
      return ctx.json(
        {
          ok: false,
          error,
        },
        error.status
      )
    }

    await accountService.createAccount(account)
    return ctx.json(account.getInfo(), 201)
  }

  public async selectSessionCharacter(ctx: HonoContext<'/selectCharacter'>) {
    const sessionId = ctx.get('sessionId')
    const { character_id: characterId } = (await ctx.req.json()) as {
      character_id: string
    }

    if (isEmpty(characterId)) {
      const error = new BadRequest()
      return ctx.json(
        {
          ok: false,
          error,
        },
        error.status
      )
    }

    const db = await connect(ctx.env.DATABASE_URL)

    await AccountSessionService(db).updateSession({ id: sessionId, characterId })

    return ctx.json({
      character_id: characterId,
    })
  }
}
