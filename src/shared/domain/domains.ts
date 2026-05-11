import { accountSessions } from './schemas/accounts/accountSessions'
import { accounts } from './schemas/accounts/accounts'
import { characterPastLifes } from './schemas/characters/characterPastLifes'
import { characters } from './schemas/characters/characters'
import { characterInventoryItems } from './schemas/characters/characterInventoryItems'
import { characterSkills } from './schemas/characters/characterSkills'
import { chatLogs, sessionLogs } from './schemas/logs'
import { items } from './schemas/items'

export {
  accounts,
  accountSessions,
  characters,
  characterInventoryItems,
  characterSkills,
  characterPastLifes,
  items,
  chatLogs,
  sessionLogs,
}

export const models = {
  accounts,
  accountSessions,
  characters,
  characterInventoryItems,
  characterSkills,
  characterPastLifes,
  items,
  chatLogs,
  sessionLogs,
}
export type Models = typeof models
