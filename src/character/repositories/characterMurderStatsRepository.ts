import { eq } from 'drizzle-orm'
import {
  CharacterMurderStats,
  CharacterMurderStatsData,
} from '../../shared/domain/entities/characters/stats/CharacterMurderStats'
import { characterMurderStats } from '../../shared/domain/schemas/characters/stats/characterMurderStats'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Database } from '../../shared/types/Database'

export class CharacterMurderStatsRepository extends RepositoryBase<'CharacterMurderStats'> {
  constructor(db: Database) {
    super(characterMurderStats, CharacterMurderStats, db)
  }

  public async getCharacterMurderStats(characterId: string) {
    const [result] = await this.db
      .select()
      .from(characterMurderStats)
      .where(eq(characterMurderStats.characterId, characterId))
      .limit(1)
      .execute()
    return CharacterMurderStats(result)
  }

  public async createCharacterMurderStats(data: Partial<CharacterMurderStatsData>) {
    return this.create(data)
  }

  public async updateCharacterMurderStats(data: Partial<CharacterMurderStatsData>) {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterMurderStats(id: string) {
    return this.delete(id)
  }
}
