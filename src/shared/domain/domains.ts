import { accountSessions } from './schemas/accounts/accountSessions'
import { accounts } from './schemas/accounts/accounts'
import { characterAppearances } from './schemas/characters/characterAppearances'
import { characters } from './schemas/characters/characters'
import { characterInventorySlots } from './schemas/characters/inventory/characterInventorySlots'
import { characterItems } from './schemas/characters/inventory/characterItems'
import { characterWallets } from './schemas/characters/inventory/characterWallets'
import { characterSkills } from './schemas/characters/skills/characterSkills'
import { characterHealthStats } from './schemas/characters/stats/characterHealthStats'
import { characterMurderStats } from './schemas/characters/stats/characterMurderStats'
import { characterStats } from './schemas/characters/stats/characterStats'

export {
  accounts,
  accountSessions,
  characters,
  characterAppearances,
  characterStats,
  characterHealthStats,
  characterMurderStats,
  characterItems,
  characterInventorySlots,
  characterWallets,
  characterSkills,
}

export const models = {
  accounts,
  accountSessions,
  characters,
  characterAppearances,
  characterStats,
  characterHealthStats,
  characterMurderStats,
  characterItems,
  characterInventorySlots,
  characterWallets,
  characterSkills,
}
export type Models = typeof models
