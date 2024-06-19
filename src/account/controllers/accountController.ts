import { ControllerBase } from '../../shared/domain/controllerBase'
import AccountSessionService from '../services/accountSessionService'
import { isEmpty } from 'lodash'
import { BadRequest, DuplicatedError } from '../../shared/errors/customErrors'
import { AccountService } from '../services/accountService'
import { HonoContext } from '../../server/types/HonoContext'
import { Account, AccountData } from '../../shared/domain/entities/accounts/Account'
import { AccountSessionData } from '../../shared/domain/entities/accounts/AccountSession'

export default class AccountController extends ControllerBase {
  private accountSessionService: AccountSessionService
  private accountService: AccountService

  constructor() {
    super()

    this.accountSessionService = new AccountSessionService()
    this.accountService = new AccountService()
  }

  public async getAccount(ctx: HonoContext<'/'>) {
    const account = ctx.get('account')

    return ctx.json(account.getInfo())
  }

  public async getAccountSessions(ctx: HonoContext<'/sessions'>) {
    const account = ctx.get('account')

    const allSessions = await this.accountSessionService.getSessions(account.id)

    return ctx.json(allSessions.map((session) => session.getInfo()))
  }

  public async createAccount(ctx: HonoContext<'/create'>) {
    const data = (await ctx.req.json()) as Partial<AccountData>

    data.username = data.username?.toLowerCase().trim()
    data.isVerified = false
    data.image = ''

    const account = Account(data)

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

    const duplicated = await this.accountService.getDuplicatedFields(account)
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

    await this.accountService.createAccount(account)
    return ctx.json(account.getInfo(), 201)
  }

  public async selectSessionCharacter(ctx: HonoContext<'/selectCharacter'>) {
    const { character_id: characterId, _session } = (await ctx.req.json()) as {
      character_id: string
      _session: AccountSessionData
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

    await this.accountSessionService.updateSession({ id: _session.id, characterId })

    return ctx.json({
      character_id: characterId,
    })
  }
}
