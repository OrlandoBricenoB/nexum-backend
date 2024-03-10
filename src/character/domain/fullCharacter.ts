import { Character } from './character'
import { CharacterAppearance } from './characterAppearance'
import { CharacterHealthStats } from './characterHealthStats'
import { CharacterMurderStats } from './characterMurderStats'
import { CharacterStats } from './characterStats'
import { CharacterWallet } from './characterWallet'

export type FullCharacter = Partial<Character> & {
  appearance: Partial<CharacterAppearance> | null
  stats: Partial<CharacterStats> | null
  healthStats: Partial<CharacterHealthStats> | null
  murderStats: Partial<CharacterMurderStats> | null
  wallet: Partial<CharacterWallet> | null
}
