import { Entity } from '../../entity'

export type CharacterAppearanceData = {
  id: string
  skinTone: string
  hairstyle: string
  facestyle: string
  gender: string
  characterId: string
  createdAt: Date
  updatedAt: Date
}

export function CharacterAppearance(values: Partial<CharacterAppearanceData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = ['name']

  const data: CharacterAppearanceData = {
    id: values.id || '',
    skinTone: values.skinTone || '',
    hairstyle: values.hairstyle || '',
    facestyle: values.facestyle || '',
    gender: values.gender || '',
    characterId: values.characterId || '',
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'CharacterAppearance'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
