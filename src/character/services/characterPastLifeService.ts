import { CharacterPastLife } from '../domain/characterPastLife'
import { CharacterPastLifeRepository } from '../repositories/characterPastLifeRepository'

export class CharacterPastLifeService {
  private characterPastLifeRepository: CharacterPastLifeRepository

  constructor() {
    this.characterPastLifeRepository = new CharacterPastLifeRepository()
  }

  public async getAllCharacterPastLifes(character_id: string): Promise<CharacterPastLife[]> {
    const allCharactersPastLifes = await this.characterPastLifeRepository.getAllCharacterPastLifes()

    const characterPastLifes = allCharactersPastLifes.filter(pastLife => pastLife.character_id === character_id)

    return characterPastLifes.map(pastLife => CharacterPastLife.create(pastLife)) as CharacterPastLife[]
  }

  public async getCharacterPastLife(id: string): Promise<CharacterPastLife | null> {
    const characterPastLife = (await this.characterPastLifeRepository.getCharacterPastLifw(id)) as CharacterPastLife

    return CharacterPastLife.create(characterPastLife)
  }

  public async getCharacterPastLife(id: string): Promise<CharacterPastLife | null> {
    return this.characterPastLifeRepository.getCharacterPastLife(id)
  }

  public async createCharacterPastLife(data: Partial<CharacterPastLife>): Promise<boolean> {
    return this.characterPastLifeRepository.createCharactePastLife(data)
  }
}
