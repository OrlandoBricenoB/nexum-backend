import { CharacterAppearanceData } from '../../shared/domain/entities/characters/CharacterAppearance'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterAppearanceRepository } from '../repositories/characterAppearanceRepository'

export class CharacterAppearanceService {
  private characterAppearanceRepository: CharacterAppearanceRepository

  constructor() {
    this.characterAppearanceRepository = new CharacterAppearanceRepository()
  }

  public async getCharacterAppearance(characterId: string) {
    const data = await this.characterAppearanceRepository.getCharacterAppearance(characterId)
    return data as unknown as EntitiesReturnType['CharacterAppearance']
  }

  public async createCharacterAppearance(data: Partial<CharacterAppearanceData>) {
    return this.characterAppearanceRepository.createCharacterAppearance(
      data
    ) as unknown as EntitiesReturnType['CharacterAppearance']
  }

  public async updateCharacterAppearance(data: Partial<CharacterAppearanceData>) {
    const stats = await this.characterAppearanceRepository.updateCharacterAppearance(data)
    return stats as unknown as EntitiesReturnType['CharacterAppearance']
  }

  public async deleteCharacterAppearance(id: string) {
    return this.characterAppearanceRepository.deleteCharacterAppearance(id)
  }
}
