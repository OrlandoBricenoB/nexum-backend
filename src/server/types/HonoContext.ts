import { Context } from 'hono'
import { BlankInput } from 'hono/types'

export type HonoVariables = {
  accountId: string
  sessionId: string
  characterId: string
}

export type HonoContext<T extends string> = Context<
  {
    Bindings: {
      DATABASE_URL: string
      ENVIRONMENT: 'development' | 'production'
      SECRET_KEY: string
    }
    Variables: HonoVariables
  },
  T,
  BlankInput
>
