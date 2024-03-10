import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { CharacterStats } from '../domain/characterStats'

export class CharacterStatsRepository extends RepositoryBase<CharacterStats> {
  constructor() {
    super('character_stats')
  }

  public async getCharacterStats(characterId: string): Promise<CharacterStats[]> {
    return this.getAll({
      character_id: characterId
    })
  }

  public async createCharacterStats(data: Partial<CharacterStats>): Promise<boolean> {
    return this.create(data)
  }

  public async updateCharacterStats(data: Partial<CharacterStats>): Promise<CharacterStats | null> {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterStats(id: string): Promise<boolean> {
    return this.delete(id)
  }
}
