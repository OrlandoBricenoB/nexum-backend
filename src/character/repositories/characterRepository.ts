import { eq } from 'drizzle-orm'
import { database } from '../../config/databaseConfig'
import { Character, CharacterData } from '../../shared/domain/entities/characters/Character'
import { characters } from '../../shared/domain/schemas/characters/characters'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'

export class CharacterRepository extends RepositoryBase<'Character'> {
  constructor() {
    super(characters, Character)
  }

  public async getAllCharacters() {
    const results = await database.select().from(characters).execute()
    return results.map((elem) => Character(elem))
  }

  public async getAllAccountCharacters(accountId: string) {
    const results = await database
      .select()
      .from(characters)
      .where(eq(characters.accountId, accountId))
      .execute()
    return results.map((elem) => Character(elem))
  }

  public async getCharacter(id: string) {
    return this.getById(id)
  }

  public async createCharacter(data: Partial<CharacterData>) {
    return this.create(data)
  }

  public async updateCharacter(data: Partial<CharacterData>) {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacter(id: string) {
    return this.delete(id)
  }
}
