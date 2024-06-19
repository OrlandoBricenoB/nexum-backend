import { eq } from 'drizzle-orm'
import {
  CharacterStats,
  CharacterStatsData,
} from '../../shared/domain/entities/characters/stats/CharacterStats'
import { characterStats } from '../../shared/domain/schemas/characters/stats/characterStats'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Database } from '../../shared/types/Database'

export class CharacterStatsRepository extends RepositoryBase<'CharacterStats'> {
  constructor(db: Database) {
    super(characterStats, CharacterStats, db)
  }

  public async getCharacterStats(characterId: string) {
    const [result] = await this.db
      .select()
      .from(characterStats)
      .where(eq(characterStats.characterId, characterId))
      .limit(1)
      .execute()
    return CharacterStats(result)
  }

  public async createCharacterStats(data: Partial<CharacterStatsData>) {
    return this.create(data)
  }

  public async updateCharacterStats(data: Partial<CharacterStatsData>) {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterStats(id: string) {
    return this.delete(id)
  }
}
