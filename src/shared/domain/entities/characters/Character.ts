import { Entity } from '../../entity'

export type CharacterData = {
  id: string
  name: string
  kingdom: string
  division: string
  clan: string
  profession: string
  slot: string
  accountId: string
  createdAt: Date
  updatedAt: Date
}

export function Character(values: Partial<CharacterData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = ['name']

  const data: CharacterData = {
    id: values.id || '',
    name: values.name || '',
    kingdom: values.kingdom || '',
    division: values.division || '',
    clan: values.clan || '',
    profession: values.profession || '',
    slot: values.slot || '',
    accountId: values.accountId || '',
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'Character'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
