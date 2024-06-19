import { CharacterAppearanceData } from '../../shared/domain/entities/characters/CharacterAppearance'
import { Database } from '../../shared/types/Database'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterAppearanceRepository } from '../repositories/characterAppearanceRepository'

export const CharacterAppearanceService = (db: Database) => {
  const characterAppearanceRepository = new CharacterAppearanceRepository(db)

  const getCharacterAppearance = async (characterId: string) => {
    const data = await characterAppearanceRepository.getCharacterAppearance(characterId)
    return data as EntitiesReturnType['CharacterAppearance']
  }

  const createCharacterAppearance = async (data: Partial<CharacterAppearanceData>) => {
    const appearance = await characterAppearanceRepository.createCharacterAppearance(data)
    return appearance as EntitiesReturnType['CharacterAppearance']
  }

  const updateCharacterAppearance = async (data: Partial<CharacterAppearanceData>) => {
    const stats = await characterAppearanceRepository.updateCharacterAppearance(data)
    return stats as EntitiesReturnType['CharacterAppearance']
  }

  const deleteCharacterAppearance = async (id: string) => {
    return characterAppearanceRepository.deleteCharacterAppearance(id)
  }

  return {
    getCharacterAppearance,
    createCharacterAppearance,
    updateCharacterAppearance,
    deleteCharacterAppearance,
  }
}
