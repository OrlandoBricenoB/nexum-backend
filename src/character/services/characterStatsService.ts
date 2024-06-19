import { CharacterStatsData } from '../../shared/domain/entities/characters/stats/CharacterStats'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterStatsRepository } from '../repositories/characterStatsRepository'

export class CharacterStatsService {
  private characterStatsRepository: CharacterStatsRepository

  constructor() {
    this.characterStatsRepository = new CharacterStatsRepository()
  }

  public async getCharacterStats(characterId: string) {
    const data = await this.characterStatsRepository.getCharacterStats(characterId)
    return data as unknown as EntitiesReturnType['CharacterStats']
  }

  public async createCharacterStats(data: Partial<CharacterStatsData>) {
    return this.characterStatsRepository.createCharacterStats(
      data
    ) as unknown as EntitiesReturnType['CharacterStats']
  }

  public async updateCharacterStats(data: Partial<CharacterStatsData>) {
    const stats = await this.characterStatsRepository.updateCharacterStats(data)
    return stats as unknown as EntitiesReturnType['CharacterStats']
  }

  public async deleteCharacterStats(id: string) {
    return this.characterStatsRepository.deleteCharacterStats(id)
  }
}
