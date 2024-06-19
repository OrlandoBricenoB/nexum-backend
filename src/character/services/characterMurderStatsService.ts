import { CharacterMurderStatsData } from '../../shared/domain/entities/characters/stats/CharacterMurderStats'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterMurderStatsRepository } from '../repositories/characterMurderStatsRepository'

export class CharacterMurderStatsService {
  private characterMurderStatsRepository: CharacterMurderStatsRepository

  constructor() {
    this.characterMurderStatsRepository = new CharacterMurderStatsRepository()
  }

  public async getCharacterMurderStats(characterId: string) {
    const data = await this.characterMurderStatsRepository.getCharacterMurderStats(characterId)
    return data as unknown as EntitiesReturnType['CharacterMurderStats']
  }

  public async createCharacterMurderStats(data: Partial<CharacterMurderStatsData>) {
    return this.characterMurderStatsRepository.createCharacterMurderStats(
      data
    ) as unknown as EntitiesReturnType['CharacterMurderStats']
  }

  public async updateCharacterMurderStats(data: Partial<CharacterMurderStatsData>) {
    const stats = await this.characterMurderStatsRepository.updateCharacterMurderStats(data)
    return stats as unknown as EntitiesReturnType['CharacterMurderStats']
  }

  public async deleteCharacterMurderStats(id: string) {
    return this.characterMurderStatsRepository.deleteCharacterMurderStats(id)
  }
}
