import { Entity } from '../../../entity'

export type CharacterItemData = {
  id: string
  inventory: number
  characterItemId: string
  characterId: string
  slot: string
  stack: number
  createdAt: Date
  updatedAt: Date
}

export function CharacterItem(values: Partial<CharacterItemData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = []

  const data: CharacterItemData = {
    id: values.id || '',
    inventory: values.inventory || 0,
    characterItemId: values.characterItemId || '',
    characterId: values.characterId || '',
    slot: values.slot || '',
    stack: values.stack || 1,
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
