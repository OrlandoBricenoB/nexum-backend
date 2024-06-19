import { Entity } from '../../../entity'

export type CharacterSkillData = {
  id: string
  level: number
  points: number
  skillId: string
  characterId: string
  createdAt: Date
  updatedAt: Date
}

export function CharacterSkill(values: Partial<CharacterSkillData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = []

  const data: CharacterSkillData = {
    id: values.id || '',
    level: values.level || 1,
    points: values.points || 0,
    skillId: values.skillId || '',
    characterId: values.characterId || '',
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'CharacterSkill'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
