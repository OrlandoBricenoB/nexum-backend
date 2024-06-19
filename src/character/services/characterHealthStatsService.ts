import { CharacterHealthStatsData } from '../../shared/domain/entities/characters/stats/CharacterHealthStats'
import { Database } from '../../shared/types/Database'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterHealthStatsRepository } from '../repositories/characterHealthStatsRepository'

export const CharacterHealthStatsService = (db: Database) => {
  const characterHealthStatsRepository = new CharacterHealthStatsRepository(db)

  const getCharacterHealthStats = async (characterId: string) => {
    const data = await characterHealthStatsRepository.getCharacterHealthStats(characterId)
    return data as EntitiesReturnType['CharacterHealthStats']
  }

  const createCharacterHealthStats = async (data: Partial<CharacterHealthStatsData>) => {
    const stats = await characterHealthStatsRepository.createCharacterHealthStats(data)
    return stats as EntitiesReturnType['CharacterHealthStats']
  }

  const updateCharacterHealthStats = async (data: Partial<CharacterHealthStatsData>) => {
    const updatedStats = await characterHealthStatsRepository.updateCharacterHealthStats(data)
    return updatedStats as EntitiesReturnType['CharacterHealthStats']
  }

  const deleteCharacterHealthStats = async (id: string) => {
    return characterHealthStatsRepository.deleteCharacterHealthStats(id)
  }

  return {
    getCharacterHealthStats,
    createCharacterHealthStats,
    updateCharacterHealthStats,
    deleteCharacterHealthStats,
  }
}
