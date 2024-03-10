import { CharacterStats } from '../domain/characterStats'
import { CharacterStatsRepository } from '../repositories/characterStatsRepository'

export class CharacterStatsService {
  private characterStatsRepository: CharacterStatsRepository

  constructor() {
    this.characterStatsRepository = new CharacterStatsRepository()
  }

  public async getCharacterStats(characterId: string): Promise<CharacterStats | null> {
    const data = await this.characterStatsRepository.getCharacterStats(characterId)
    return data.length ? CharacterStats.create(data[0]) : null
  }

  public async createCharacterStats(data: Partial<CharacterStats>): Promise<boolean> {
    return this.characterStatsRepository.createCharacterStats(data)
  }

  public async updateCharacterStats(data: Partial<CharacterStats>): Promise<CharacterStats | null> {
    const stats = await this.characterStatsRepository.updateCharacterStats(data)
    return stats
  }

  public async deleteCharacterStats(id: string): Promise<boolean> {
    return this.characterStatsRepository.deleteCharacterStats(id)
  }
}
