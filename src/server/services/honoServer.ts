import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { connect, database } from '../../config/databaseConfig'
import { CharacterService } from '../../character/services/characterService'
import { BlankEnv, BlankSchema } from 'hono/types'

export type HonoApp = Hono<BlankEnv, BlankSchema, '/'>

export class HonoServer {
  private app: HonoApp

  constructor() {
    this.app = new Hono({
      strict: false,
    })
    this.app.use('/api/*', cors())
  }

  public getApp() {
    return this.app
  }

  public async listen(port: number): Promise<void> {
    try {
      await connect()

      serve({
        fetch: this.app.fetch,
        port,
      })
      console.log(`Server running on port ${port}`)
      if (database) {
        const characterService = new CharacterService()
        const characters = await characterService.getAllCharacters()
        console.log({ characters })
      }
    } catch (error) {
      console.error(error)
    }
  }
}
