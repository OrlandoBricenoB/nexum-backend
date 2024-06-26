import { Entity } from '../../../entity'

export type CharacterItemData = {
  id: string
  level: number
  quality: string
  itemId: string
  characterId: string
  createdAt: Date
  updatedAt: Date
}

export function CharacterItem(values: Partial<CharacterItemData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = []

  const data: CharacterItemData = {
    id: values.id || '',
    level: values.level || 0,
    quality: values.quality || '',
    itemId: values.itemId || '',
    characterId: values.characterId || '',
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'CharacterItem'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
