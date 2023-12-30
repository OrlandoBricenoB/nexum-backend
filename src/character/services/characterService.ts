import { Character } from "../domain/character";
import { CharacterRepository } from "../repositories/characterRepository";

export class CharacterService {
  private characterRepository: CharacterRepository;

  constructor() {
    this.characterRepository = new CharacterRepository()
  }

  public async getAllCharacters(): Promise<Character[]> {
    return this.characterRepository.getAllCharacters()
  }

  public async getCharacter(id: string): Promise<Character | null> {
    return this.characterRepository.getCharacter(id)
  }

  // Puedes implementar otras funciones relacionadas con la lógica de negocio de las galerías
}
