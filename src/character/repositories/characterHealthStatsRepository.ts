import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { CharacterHealthStats } from '../domain/characterHealthStats'

export class CharacterHealthStatsRepository extends RepositoryBase<CharacterHealthStats> {
  constructor() {
    super('character_health_stats')
  }

  public async getCharacterHealthStats(characterId: string): Promise<CharacterHealthStats[]> {
    return this.getAll({
      character_id: characterId
    })
  }

  public async createCharacterHealthStats(data: Partial<CharacterHealthStats>): Promise<boolean> {
    return this.create(data)
  }

  public async updateCharacterHealthStats(data: Partial<CharacterHealthStats>): Promise<CharacterHealthStats | null> {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterHealthStats(id: string): Promise<boolean> {
    return this.delete(id)
  }
}
