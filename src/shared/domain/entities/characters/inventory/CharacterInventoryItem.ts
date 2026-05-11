import { Entity } from '../../../entity'

export type CharacterInventoryItemData = {
  id: string
  characterId: string
  itemId: string
  inventory: number
  slot: string
  stack: number
  createdAt: Date
  updatedAt: Date
}

export function CharacterInventoryItem(values: Partial<CharacterInventoryItemData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = []

  const data: CharacterInventoryItemData = {
    id: values.id || '',
    characterId: values.characterId || '',
    itemId: values.itemId || '',
    inventory: values.inventory || 0,
    slot: values.slot || '',
    stack: values.stack || 0,
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'CharacterInventoryItem'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
