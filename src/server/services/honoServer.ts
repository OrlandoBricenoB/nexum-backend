import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { BlankSchema } from 'hono/types'
import { HonoVariables } from '../types/HonoContext'

export type HonoApp = Hono<
  {
    Variables: HonoVariables
  },
  BlankSchema,
  '/'
>

export class HonoServer {
  private app: HonoApp

  constructor() {
    this.app = new Hono<{ Variables: HonoVariables }>({
      strict: false,
    })
    this.app.use('/api/*', cors())
  }

  public getApp() {
    return this.app
  }
}
