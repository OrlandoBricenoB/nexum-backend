import { Character } from '../domain/character'
import { CharacterRepository } from '../repositories/characterRepository'

export class CharacterService {
  private characterRepository: CharacterRepository

  constructor() {
    this.characterRepository = new CharacterRepository()
  }

  public async getAllCharacters(): Promise<Character[]> {
    const allCharacters = await this.characterRepository.getAllCharacters()

    return allCharacters.map(character => Character.create(character)) as Character[]
  }

  public async getCharacter(id: string): Promise<Character | null> {
    const character = await this.characterRepository.getCharacter(id)

    return Character.create(character)
  }

  public async createCharacter(data: Partial<Character>): Promise<boolean> {
    return this.characterRepository.createCharacter(data)
  }
}
