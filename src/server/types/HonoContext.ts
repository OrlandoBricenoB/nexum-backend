import { Context } from 'hono'
import { BlankInput } from 'hono/types'

export type HonoContext<T extends string> = Context<
  {
    Variables: {
      accountId: string
      sessionId: string
      characterId: string
    }
  },
  T,
  BlankInput
>
