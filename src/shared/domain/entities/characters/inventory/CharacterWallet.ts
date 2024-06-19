import { Entity } from '../../../entity'

export type CharacterWalletData = {
  id: string
  hesedias: number
  nexumCoins: number
  characterId: string
  createdAt: Date
  updatedAt: Date
}

export function CharacterWallet(values: Partial<CharacterWalletData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = []

  const data: CharacterWalletData = {
    id: values.id || '',
    hesedias: values.hesedias || 0,
    nexumCoins: values.nexumCoins || 0,
    characterId: values.characterId || '',
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'CharacterWallet'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
