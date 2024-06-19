import { CharacterMurderStatsData } from '../../shared/domain/entities/characters/stats/CharacterMurderStats'
import { Database } from '../../shared/types/Database'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterMurderStatsRepository } from '../repositories/characterMurderStatsRepository'

export const CharacterMurderStatsService = (db: Database) => {
  const characterMurderStatsRepository = new CharacterMurderStatsRepository(db)

  const getCharacterMurderStats = async (characterId: string) => {
    const data = await characterMurderStatsRepository.getCharacterMurderStats(characterId)
    return data as EntitiesReturnType['CharacterMurderStats']
  }

  const createCharacterMurderStats = async (data: Partial<CharacterMurderStatsData>) => {
    const stats = await characterMurderStatsRepository.createCharacterMurderStats(data)
    return stats as EntitiesReturnType['CharacterMurderStats']
  }

  const updateCharacterMurderStats = async (data: Partial<CharacterMurderStatsData>) => {
    const updatedStats = await characterMurderStatsRepository.updateCharacterMurderStats(data)
    return updatedStats as EntitiesReturnType['CharacterMurderStats']
  }

  const deleteCharacterMurderStats = async (id: string) => {
    return await characterMurderStatsRepository.deleteCharacterMurderStats(id)
  }

  return {
    getCharacterMurderStats,
    createCharacterMurderStats,
    updateCharacterMurderStats,
    deleteCharacterMurderStats,
  }
}
