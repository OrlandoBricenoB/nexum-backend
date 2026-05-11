import { Entity } from '../../../entity'

export type CharacterSkillData = {
  characterId: string
  skillId: number
  skillLevel: number
}

export function CharacterSkill(values: Partial<CharacterSkillData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = []

  const data: CharacterSkillData = {
    characterId: values.characterId || '',
    skillId: values.skillId || 0,
    skillLevel: values.skillLevel || 1,
  }

  const supEntity = Entity<'CharacterSkill'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
