import { Models } from '../domain/domains'
import { entities } from '../domain/entities'
import { Account, AccountData } from '../domain/entities/accounts/Account'
import { AccountSession, AccountSessionData } from '../domain/entities/accounts/AccountSession'
import { Character, CharacterData } from '../domain/entities/characters/Character'
import {
  CharacterAppearance,
  CharacterAppearanceData,
} from '../domain/entities/characters/CharacterAppearance'
import {
  CharacterStats,
  CharacterStatsData,
} from '../domain/entities/characters/stats/CharacterStats'
import {
  CharacterHealthStats,
  CharacterHealthStatsData,
} from '../domain/entities/characters/stats/CharacterHealthStats'
import {
  CharacterMurderStats,
  CharacterMurderStatsData,
} from '../domain/entities/characters/stats/CharacterMurderStats'
import {
  CharacterInventorySlot,
  CharacterInventorySlotData,
} from '../domain/entities/characters/inventory/CharacterInventorySlot'
import {
  CharacterItem,
  CharacterItemData,
} from '../domain/entities/characters/inventory/CharacterItem'
import {
  CharacterWallet,
  CharacterWalletData,
} from '../domain/entities/characters/inventory/CharacterWallet'
import {
  CharacterSkill,
  CharacterSkillData,
} from '../domain/entities/characters/skills/CharacterSkill'
import { CharacterPastLife, CharacterPastLifeData } from '../domain/entities/CharacterPastLife'

export type Entities = typeof entities
export type EntitiesReturnType = {
  Account: ReturnType<typeof Account>
  AccountSession: ReturnType<typeof AccountSession>
  Character: ReturnType<typeof Character>
  CharacterAppearance: ReturnType<typeof CharacterAppearance>
  CharacterStats: ReturnType<typeof CharacterStats>
  CharacterHealthStats: ReturnType<typeof CharacterHealthStats>
  CharacterMurderStats: ReturnType<typeof CharacterMurderStats>
  CharacterItem: ReturnType<typeof CharacterItem>
  CharacterInventorySlot: ReturnType<typeof CharacterInventorySlot>
  CharacterWallet: ReturnType<typeof CharacterWallet>
  CharacterSkill: ReturnType<typeof CharacterSkill>
  CharacterPastLife: ReturnType<typeof CharacterPastLife>
}
export type DataEntitiesByKey = {
  Account: AccountData
  AccountSession: AccountSessionData
  Character: CharacterData
  CharacterAppearance: CharacterAppearanceData
  CharacterStats: CharacterStatsData
  CharacterHealthStats: CharacterHealthStatsData
  CharacterMurderStats: CharacterMurderStatsData
  CharacterItem: CharacterItemData
  CharacterInventorySlot: CharacterInventorySlotData
  CharacterWallet: CharacterWalletData
  CharacterSkill: CharacterSkillData
  CharacterPastLife: CharacterPastLifeData
}

export type EntityModelMap = {
  Account: 'accounts'
  AccountSession: 'accountSessions'
  Character: 'characters'
  CharacterAppearance: 'characterAppearances'
  CharacterStats: 'characterStats'
  CharacterHealthStats: 'characterHealthStats'
  CharacterMurderStats: 'characterMurderStats'
  CharacterItem: 'characterItems'
  CharacterInventorySlot: 'characterInventorySlots'
  CharacterWallet: 'characterWallets'
  CharacterSkill: 'characterSkills'
  CharacterPastLife: 'characterPastLifes'
}
export type EntityKeys = keyof Entities
export type ModelKeys = keyof Models
