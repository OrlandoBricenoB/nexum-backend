import { CharacterRoutes } from '../../character/routes/characterRoutes'
import { AccountsRouter } from '../../account/routes/accountsRoutes'
import { CharacterPastLifeRouter } from '../../character/routes/characterPastLifeRoutes'
import { AuthRouter } from '../../auth/routes/AuthRouter'
import { TcpRequestRouter } from '../../tcp-client/routes/tcpRequestRoutes'
import { HonoApp } from '../services/honoServer'
import { Hono } from 'hono'

export function registerRoutes(app: HonoApp): void {
  const router = new Hono()

  router.route('/auth', AuthRouter)
  router.route('/accounts', AccountsRouter)
  router.route('/characters', CharacterRoutes)
  router.route('/past-lifes', CharacterPastLifeRouter)
  router.route('/tcp-requests', TcpRequestRouter)

  app.route('/api/v1', router)
}
