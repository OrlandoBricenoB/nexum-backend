import { Express } from 'express'
import { CharacterRoutes } from '../../character/routes/characterRoutes'

export function registerRoutes(app: Express): void {
  app.use('/characters', CharacterRoutes)
}
