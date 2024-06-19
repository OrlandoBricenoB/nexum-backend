import { eq } from 'drizzle-orm'
import {
  CharacterHealthStats,
  CharacterHealthStatsData,
} from '../../shared/domain/entities/characters/stats/CharacterHealthStats'
import { characterHealthStats } from '../../shared/domain/schemas/characters/stats/characterHealthStats'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Database } from '../../shared/types/Database'

export class CharacterHealthStatsRepository extends RepositoryBase<'CharacterHealthStats'> {
  constructor(db: Database) {
    super(characterHealthStats, CharacterHealthStats, db)
  }

  public async getCharacterHealthStats(characterId: string) {
    const [result] = await this.db
      .select()
      .from(characterHealthStats)
      .where(eq(characterHealthStats.characterId, characterId))
      .limit(1)
      .execute()
    return CharacterHealthStats(result)
  }

  public async createCharacterHealthStats(data: Partial<CharacterHealthStatsData>) {
    return this.create(data)
  }

  public async updateCharacterHealthStats(data: Partial<CharacterHealthStatsData>) {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterHealthStats(id: string) {
    return this.delete(id)
  }
}
