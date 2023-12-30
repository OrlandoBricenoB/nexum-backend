import { database } from "../../config/databaseConfig";
import { Character } from "../domain/character";

export class CharacterRepository {
  public async getAllCharacters(): Promise<Character[]> {
    return database.getAll<Character>('characters')
  }

  public async getCharacter(id: string): Promise<Character | null> {
    return database.getById<Character>('characters', id)
  }
}
