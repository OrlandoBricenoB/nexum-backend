import { eq } from 'drizzle-orm'
import {
  CharacterAppearance,
  CharacterAppearanceData,
} from '../../shared/domain/entities/characters/CharacterAppearance'
import { characterAppearances } from '../../shared/domain/schemas/characters/characterAppearances'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Database } from '../../shared/types/Database'

export class CharacterAppearanceRepository extends RepositoryBase<'CharacterAppearance'> {
  constructor(db: Database) {
    super(characterAppearances, CharacterAppearance, db)
  }

  public async getCharacterAppearance(characterId: string) {
    const [result] = await this.db
      .select()
      .from(characterAppearances)
      .where(eq(characterAppearances.characterId, characterId))
      .limit(1)
      .execute()
    return CharacterAppearance(result)
  }

  public async createCharacterAppearance(data: Partial<CharacterAppearanceData>) {
    return this.create(data)
  }

  public async updateCharacterAppearance(data: Partial<CharacterAppearanceData>) {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterAppearance(id: string) {
    return this.delete(id)
  }
}
