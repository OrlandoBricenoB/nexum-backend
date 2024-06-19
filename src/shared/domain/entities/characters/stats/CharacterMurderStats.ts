import { Entity } from '../../../entity'

export type CharacterMurderStatsData = {
  id: string
  honor: number
  kills: number
  deaths: number
  assists: number
  deathCount: string
  characterId: string
  createdAt: Date
  updatedAt: Date
}

export function CharacterMurderStats(values: Partial<CharacterMurderStatsData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = []

  const data: CharacterMurderStatsData = {
    id: values.id || '',
    honor: values.honor || 0,
    kills: values.kills || 0,
    deaths: values.deaths || 0,
    assists: values.assists || 0,
    deathCount: values.deathCount || '0.00',
    characterId: values.characterId || '',
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'CharacterMurderStats'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
