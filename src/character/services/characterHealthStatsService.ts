import { CharacterHealthStatsData } from '../../shared/domain/entities/characters/stats/CharacterHealthStats'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterHealthStatsRepository } from '../repositories/characterHealthStatsRepository'

export class CharacterHealthStatsService {
  private characterHealthStatsRepository: CharacterHealthStatsRepository

  constructor() {
    this.characterHealthStatsRepository = new CharacterHealthStatsRepository()
  }

  public async getCharacterHealthStats(characterId: string) {
    const data = await this.characterHealthStatsRepository.getCharacterHealthStats(characterId)
    return data as unknown as EntitiesReturnType['CharacterHealthStats']
  }

  public async createCharacterHealthStats(data: Partial<CharacterHealthStatsData>) {
    return this.characterHealthStatsRepository.createCharacterHealthStats(
      data
    ) as unknown as EntitiesReturnType['CharacterHealthStats']
  }

  public async updateCharacterHealthStats(data: Partial<CharacterHealthStatsData>) {
    const stats = await this.characterHealthStatsRepository.updateCharacterHealthStats(data)
    return stats as unknown as EntitiesReturnType['CharacterHealthStats']
  }

  public async deleteCharacterHealthStats(id: string) {
    return this.characterHealthStatsRepository.deleteCharacterHealthStats(id)
  }
}
