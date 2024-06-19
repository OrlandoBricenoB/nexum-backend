import { Entity } from '../../../entity'

export type CharacterStatsData = {
  id: string
  level: number
  exp: number
  rebirths: number
  skillPoints: number
  elementPoints: number
  rebirthPoints: number
  rank: string
  characterId: string
  createdAt: Date
  updatedAt: Date
}

export function CharacterStats(values: Partial<CharacterStatsData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = []

  const data: CharacterStatsData = {
    id: values.id || '',
    level: values.level || 0,
    exp: values.exp || 0,
    rebirths: values.rebirths || 0,
    skillPoints: values.skillPoints || 0,
    elementPoints: values.elementPoints || 0,
    rebirthPoints: values.rebirthPoints || 0,
    rank: values.rank || '',
    characterId: values.characterId || '',
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'CharacterStats'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
