import { Models, models } from '../domain/domains'
import { entities } from '../domain/entities'
import { Account } from '../domain/entities/accounts/Account'
import { AccountSession } from '../domain/entities/accounts/AccountSession'
import { Character } from '../domain/entities/characters/Character'
import { CharacterInventoryItem } from '../domain/entities/characters/inventory/CharacterInventoryItem'

import { CharacterSkill } from '../domain/entities/characters/skills/CharacterSkill'
import { CharacterPastLife } from '../domain/entities/characters/CharacterPastLife'

export type Entities = typeof entities
export type EntitiesReturnType = {
  Account: ReturnType<typeof Account>
  AccountSession: ReturnType<typeof AccountSession>
  Character: ReturnType<typeof Character>

  CharacterInventoryItem: ReturnType<typeof CharacterInventoryItem>
  CharacterSkill: ReturnType<typeof CharacterSkill>
  CharacterPastLife: ReturnType<typeof CharacterPastLife>
}
export type DataEntitiesByKey = {
  Account: typeof models.accounts.$inferSelect
  AccountSession: typeof models.accountSessions.$inferSelect
  Character: typeof models.characters.$inferSelect

  CharacterInventoryItem: typeof models.characterInventoryItems.$inferSelect
  CharacterSkill: typeof models.characterSkills.$inferSelect
  CharacterPastLife: typeof models.characterPastLifes.$inferSelect
}

export type EntityModelMap = {
  Account: 'accounts'
  AccountSession: 'accountSessions'
  Character: 'characters'

  CharacterInventoryItem: 'characterInventoryItems'
  CharacterSkill: 'characterSkills'
  CharacterPastLife: 'characterPastLifes'
}
export type EntityKeys = keyof Entities
export type ModelKeys = keyof Models
