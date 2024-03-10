import { CharacterMurderStats } from '../domain/characterMurderStats'
import { CharacterMurderStatsRepository } from '../repositories/characterMurderStatsRepository'

export class CharacterMurderStatsService {
  private characterMurderStatsRepository: CharacterMurderStatsRepository

  constructor() {
    this.characterMurderStatsRepository = new CharacterMurderStatsRepository()
  }

  public async getCharacterMurderStats(characterId: string): Promise<CharacterMurderStats | null> {
    const data = await this.characterMurderStatsRepository.getCharacterMurderStats(characterId)
    return data.length ? CharacterMurderStats.create(data[0]) : null
  }

  public async createCharacterMurderStats(data: Partial<CharacterMurderStats>): Promise<boolean> {
    return this.characterMurderStatsRepository.createCharacterMurderStats(data)
  }

  public async updateCharacterMurderStats(data: Partial<CharacterMurderStats>): Promise<CharacterMurderStats | null> {
    const stats = await this.characterMurderStatsRepository.updateCharacterMurderStats(data)
    return stats
  }

  public async deleteCharacterMurderStats(id: string): Promise<boolean> {
    return this.characterMurderStatsRepository.deleteCharacterMurderStats(id)
  }
}
