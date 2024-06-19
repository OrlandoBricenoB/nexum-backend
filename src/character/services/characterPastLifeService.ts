import { CharacterPastLifeData } from '../../shared/domain/entities/CharacterPastLife'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterPastLifeRepository } from '../repositories/characterPastLifeRepository'

export class CharacterPastLifeService {
  private characterPastLifeRepository: CharacterPastLifeRepository

  constructor() {
    this.characterPastLifeRepository = new CharacterPastLifeRepository()
  }

  public async getAllCharacterPastLifes(characterId: string) {
    const allCharactersPastLifes =
      await this.characterPastLifeRepository.getAllCharacterPastLifes(characterId)

    return allCharactersPastLifes as Array<EntitiesReturnType['CharacterPastLife']>
  }

  public async getCharacterPastLife(id: string) {
    const characterPastLife = await this.characterPastLifeRepository.getCharacterPastLife(id)

    return characterPastLife as EntitiesReturnType['CharacterPastLife']
  }

  public async createCharacterPastLife(data: Partial<CharacterPastLifeData>) {
    return this.characterPastLifeRepository.createCharacterPastLife(
      data
    ) as unknown as EntitiesReturnType['CharacterPastLife']
  }
}
