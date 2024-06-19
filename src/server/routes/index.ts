import { CharacterRoutes } from '../../character/routes/characterRoutes'
import { AccountsRouter } from '../../account/routes/accountsRoutes'
import { CharacterPastLifeRouter } from '../../character/routes/characterPastLifeRoutes'
import { AuthRouter } from '../../auth/routes/AuthRouter'
import { HonoApp } from '../services/honoServer'
import { Hono } from 'hono'
import { TcpRequestRouter } from '../../tcp-client/routes/tcpRequestRoutes'

export function registerRoutes(app: HonoApp): void {
  app.get('/', (ctx) => {
    const ip = ctx.req.raw.headers.get('CF-Connecting-IP') || ''

    return ctx.text(`it works! ${ip}`)
  })

  const router = new Hono()

  router.route('/auth', AuthRouter)
  router.route('/accounts', AccountsRouter)
  router.route('/characters', CharacterRoutes)
  router.route('/past-lifes', CharacterPastLifeRouter)
  router.route('/tcp-requests', TcpRequestRouter)

  app.route('/api/v1', router)
}
