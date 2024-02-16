import { Express } from 'express'
import { CharacterRoutes } from '../../character/routes/characterRoutes'
import { AccountsRouter } from '../../account/routes/accountsRoutes'
import { CharacterPastLifeRouter } from '../../character/routes/characterPastLifeRoutes'

export function registerRoutes(app: Express): void {
  app.use('/characters', CharacterRoutes)
  app.use('/past-lifes', CharacterPastLifeRouter)
  app.use('/accounts', AccountsRouter)
}
