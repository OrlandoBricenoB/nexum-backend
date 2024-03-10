import { Character } from '../domain/character'
import { CharacterRepository } from '../repositories/characterRepository'

export class CharacterService {
  private characterRepository: CharacterRepository

  constructor() {
    this.characterRepository = new CharacterRepository()
  }

  public async getAllCharacters(): Promise<Character[]> {
    const characters = await this.characterRepository.getAllCharacters()
    return characters.map(character => Character.create(character)) as Character[]
  }

  public async getCharacter(id: string): Promise<Character | null> {
    const character = await this.characterRepository.getCharacter(id)

    return Character.create(character)
  }

  public async createCharacter(data: Partial<Character>): Promise<boolean> {
    return this.characterRepository.createCharacter(data)
  }

  public async updateCharacter(data: Partial<Character>): Promise<Character | null> {
    const character = await this.characterRepository.updateCharacter(data)
    return character
  }

  public async getAllAccountCharacters(account_id: string): Promise<Character[]> {
    const allAccountCharacters = await this.characterRepository.getAllCharacters({ account_id })

    return allAccountCharacters.map(character => Character.create(character)) as Character[]
  }

  public async deleteCharacter(id: string): Promise<boolean> {
    return this.characterRepository.deleteCharacter(id)
  }

  public async existsCharacter(id: string): Promise<boolean> {
    const character = this.characterRepository.getCharacter(id)

    return character !== null
  }

  public async getDuplicatedFields(character: Character): Promise<Array<keyof Character>> {
    const duplicated = await this.characterRepository.getDuplicatedFields(character)

    return duplicated
  }
}
