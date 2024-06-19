import { eq } from 'drizzle-orm'
import {
  CharacterPastLife,
  CharacterPastLifeData,
} from '../../shared/domain/entities/CharacterPastLife'
import { characterPastLifes } from '../../shared/domain/schemas/characters/characterPastLifes'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Database } from '../../shared/types/Database'

export class CharacterPastLifeRepository extends RepositoryBase<'CharacterPastLife'> {
  constructor(db: Database) {
    super(characterPastLifes, CharacterPastLife, db)
  }

  public async getAllCharacterPastLifes(characterId: string) {
    const results = await this.db
      .select()
      .from(characterPastLifes)
      .where(eq(characterPastLifes.characterId, characterId))
      .execute()
    return results.map((elem) => CharacterPastLife(elem))
  }

  public async getCharacterPastLife(id: string) {
    const [result] = await this.db
      .select()
      .from(characterPastLifes)
      .where(eq(characterPastLifes.id, id))
      .limit(1)
      .execute()
    return CharacterPastLife(result)
  }

  public async createCharacterPastLife(data: Partial<CharacterPastLifeData>) {
    return this.create(data)
  }

  public async deleteCharacterPastLife(id: string) {
    return this.delete(id)
  }
}
