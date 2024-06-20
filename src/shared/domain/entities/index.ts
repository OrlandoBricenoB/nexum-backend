import { CharacterPastLife } from './CharacterPastLife'
import { Account } from './accounts/Account'
import { AccountSession } from './accounts/AccountSession'
import { Character } from './characters/Character'
import { CharacterAppearance } from './characters/CharacterAppearance'
import { CharacterInventorySlot } from './characters/inventory/CharacterInventorySlot'
import { CharacterItem } from './characters/inventory/CharacterItem'
import { CharacterWallet } from './characters/inventory/CharacterWallet'
import { CharacterLocation } from './characters/location/CharacterLocation'
import { CharacterSkill } from './characters/skills/CharacterSkill'
import { CharacterHealthStats } from './characters/stats/CharacterHealthStats'
import { CharacterMurderStats } from './characters/stats/CharacterMurderStats'
import { CharacterStats } from './characters/stats/CharacterStats'

export const entities = {
  Account,
  AccountSession,
  Character,
  CharacterAppearance,
  CharacterStats,
  CharacterHealthStats,
  CharacterMurderStats,
  CharacterItem,
  CharacterInventorySlot,
  CharacterWallet,
  CharacterSkill,
  CharacterPastLife,
  CharacterLocation,
}
