import { CharacterHealthStats } from '../domain/characterHealthStats'
import { CharacterHealthStatsRepository } from '../repositories/characterHealthStatsRepository'

export class CharacterHealthStatsService {
  private characterHealthStatsRepository: CharacterHealthStatsRepository

  constructor() {
    this.characterHealthStatsRepository = new CharacterHealthStatsRepository()
  }

  public async getCharacterHealthStats(characterId: string): Promise<CharacterHealthStats | null> {
    const data = await this.characterHealthStatsRepository.getCharacterHealthStats(characterId)
    return data.length ? CharacterHealthStats.create(data[0]) : null
  }

  public async createCharacterHealthStats(data: Partial<CharacterHealthStats>): Promise<boolean> {
    return this.characterHealthStatsRepository.createCharacterHealthStats(data)
  }

  public async updateCharacterHealthStats(data: Partial<CharacterHealthStats>): Promise<CharacterHealthStats | null> {
    const stats = await this.characterHealthStatsRepository.updateCharacterHealthStats(data)
    return stats
  }

  public async deleteCharacterHealthStats(id: string): Promise<boolean> {
    return this.characterHealthStatsRepository.deleteCharacterHealthStats(id)
  }
}
