import { CharacterAppearance } from '../domain/characterAppearance'
import { CharacterAppearanceRepository } from '../repositories/characterAppearanceRepository'

export class CharacterAppearanceService {
  private characterAppearanceRepository: CharacterAppearanceRepository

  constructor() {
    this.characterAppearanceRepository = new CharacterAppearanceRepository()
  }

  public async getCharacterAppearance(characterId: string): Promise<CharacterAppearance | null> {
    const data = await this.characterAppearanceRepository.getCharacterAppearance(characterId)
    return data.length ? CharacterAppearance.create(data[0]) : null
  }

  public async createCharacterAppearance(data: Partial<CharacterAppearance>): Promise<boolean> {
    return this.characterAppearanceRepository.createCharacterAppearance(data)
  }

  public async updateCharacterAppearance(data: Partial<CharacterAppearance>): Promise<CharacterAppearance | null> {
    const stats = await this.characterAppearanceRepository.updateCharacterAppearance(data)
    return stats
  }

  public async deleteCharacterAppearance(id: string): Promise<boolean> {
    return this.characterAppearanceRepository.deleteCharacterAppearance(id)
  }
}
