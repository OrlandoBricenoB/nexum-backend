import { CharacterStatsData } from '../../shared/domain/entities/characters/stats/CharacterStats'
import { Database } from '../../shared/types/Database'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterStatsRepository } from '../repositories/characterStatsRepository'

export const CharacterStatsService = (db: Database) => {
  const characterStatsRepository = new CharacterStatsRepository(db)

  const getCharacterStats = async (characterId: string) => {
    const data = await characterStatsRepository.getCharacterStats(characterId)
    return data as EntitiesReturnType['CharacterStats']
  }

  const createCharacterStats = async (data: Partial<CharacterStatsData>) => {
    const stats = await characterStatsRepository.createCharacterStats(data)
    return stats as EntitiesReturnType['CharacterStats']
  }

  const updateCharacterStats = async (data: Partial<CharacterStatsData>) => {
    const updatedStats = await characterStatsRepository.updateCharacterStats(data)
    return updatedStats as EntitiesReturnType['CharacterStats']
  }

  const deleteCharacterStats = async (id: string) => {
    return characterStatsRepository.deleteCharacterStats(id)
  }

  return {
    getCharacterStats,
    createCharacterStats,
    updateCharacterStats,
    deleteCharacterStats,
  }
}
