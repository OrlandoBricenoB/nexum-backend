import { Entity } from '../../../entity'

export type CharacterHealthStatsData = {
  id: string
  vitality: string
  stamina: string
  mana: string
  manaReserve: string
  characterId: string
  createdAt: Date
  updatedAt: Date
}

export function CharacterHealthStats(values: Partial<CharacterHealthStatsData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = []

  const data: CharacterHealthStatsData = {
    id: values.id || '',
    vitality: values.vitality || '',
    stamina: values.stamina || '',
    mana: values.mana || '',
    manaReserve: values.manaReserve || '',
    characterId: values.characterId || '',
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'CharacterHealthStats'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
