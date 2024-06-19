import { Context } from 'hono'
import { BlankInput } from 'hono/types'
import { EntitiesReturnType } from '../../shared/types/Entities'

export type HonoContext<T extends string> = Context<
  {
    Variables: {
      account: EntitiesReturnType['Account']
      sessionId: string
      characterId: string
    }
  },
  T,
  BlankInput
>
