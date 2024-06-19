import { CharacterRoutes } from '../../character/routes/characterRoutes'
import { AccountsRouter } from '../../account/routes/accountsRoutes'
import { CharacterPastLifeRouter } from '../../character/routes/characterPastLifeRoutes'
import { AuthRouter } from '../../auth/routes/AuthRouter'
import { HonoApp } from '../services/honoServer'
import { Hono } from 'hono'
import { TcpRequestRouter } from '../../tcp-client/routes/tcpRequestRoutes'
import { connect } from '../../config/databaseConfig'
import { AccountService } from '../../account/services/accountService'
import { CharacterService } from '../../character/services/characterService'

export function registerRoutes(app: HonoApp): void {
  app.get('/', async (ctx) => {
    const ip = ctx.req.raw.headers.get('CF-Connecting-IP') || ''

    const db = await connect(ctx.env.DATABASE_URL)
    const accountService = AccountService(db)
    const accounts = await accountService.getAccounts()
    const characterService = CharacterService(db)
    const characters = await characterService.getAllCharacters()

    return ctx.json({
      message: 'it works!',
      ip,
      accounts,
      characters,
    })
  })

  const router = new Hono()

  router.route('/auth', AuthRouter)
  router.route('/accounts', AccountsRouter)
  router.route('/characters', CharacterRoutes)
  router.route('/past-lifes', CharacterPastLifeRouter)
  router.route('/tcp-requests', TcpRequestRouter)

  app.route('/api/v1', router)
}
