import { CharacterWalletData } from '../../shared/domain/entities/characters/inventory/CharacterWallet'
import { Database } from '../../shared/types/Database'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterWalletRepository } from '../repositories/characterWalletRepository'

export const CharacterWalletService = (db: Database) => {
  const characterWalletRepository = new CharacterWalletRepository(db)

  const getCharacterWallet = async (characterId: string) => {
    const data = await characterWalletRepository.getCharacterWallet(characterId)
    return data as EntitiesReturnType['CharacterWallet']
  }

  const createCharacterWallet = async (data: Partial<CharacterWalletData>) => {
    const wallet = await characterWalletRepository.createCharacterWallet(data)
    return wallet as EntitiesReturnType['CharacterWallet']
  }

  const updateCharacterWallet = async (data: Partial<CharacterWalletData>) => {
    const stats = await characterWalletRepository.updateCharacterWallet(data)
    return stats as EntitiesReturnType['CharacterWallet']
  }

  const deleteCharacterWallet = async (id: string) => {
    return characterWalletRepository.deleteCharacterWallet(id)
  }

  return {
    getCharacterWallet,
    createCharacterWallet,
    updateCharacterWallet,
    deleteCharacterWallet,
  }
}
