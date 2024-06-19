import { Entity } from '../entity'

export type CharacterPastLifeData = {
  id: string
  name: string
  kingdom: string
  rank: string
  honor: number
  rebirth: number
  kills: number
  deaths: number
  assists: number
  characterId: string
  createdAt: Date
  updatedAt: Date
}

export function CharacterPastLife(values: Partial<CharacterPastLifeData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = []

  const data: CharacterPastLifeData = {
    id: values.id || '',
    name: values.name || '',
    kingdom: values.kingdom || '',
    rank: values.rank || '',
    honor: values.honor || 0,
    rebirth: values.rebirth || 0,
    kills: values.kills || 0,
    deaths: values.deaths || 0,
    assists: values.assists || 0,
    characterId: values.characterId || '',
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'CharacterPastLife'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
