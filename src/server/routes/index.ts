import { Express } from 'express'
import { CharacterRoutes } from '../../character/routes/characterRoutes'
import { AccountsRouter } from '../../account/routes/accountsRoutes'

export function registerRoutes(app: Express): void {
  app.use('/characters', CharacterRoutes)
  app.use('/accounts', AccountsRouter)
}
