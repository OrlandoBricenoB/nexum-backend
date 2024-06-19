import { eq } from 'drizzle-orm'
import { database } from '../../config/databaseConfig'
import {
  CharacterMurderStats,
  CharacterMurderStatsData,
} from '../../shared/domain/entities/characters/stats/CharacterMurderStats'
import { characterMurderStats } from '../../shared/domain/schemas/characters/stats/characterMurderStats'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'

export class CharacterMurderStatsRepository extends RepositoryBase<'CharacterMurderStats'> {
  constructor() {
    super(characterMurderStats, CharacterMurderStats)
  }

  public async getCharacterMurderStats(characterId: string) {
    const [result] = await database
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
