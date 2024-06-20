import { Entity } from '../../../entity'

export type CharacterLocationData = {
  id: string
  region: string
  positionX: number
  positionY: number
  characterId: string
  createdAt: Date
  updatedAt: Date
}

export function CharacterLocation(values: Partial<CharacterLocationData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = ['name']

  const data: CharacterLocationData = {
    id: values.id || '',
    region: values.region || '',
    positionX: values.positionX || 0,
    positionY: values.positionY || 0,
    characterId: values.characterId || '',
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'CharacterLocation'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
