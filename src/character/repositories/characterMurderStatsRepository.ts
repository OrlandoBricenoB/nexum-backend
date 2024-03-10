import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { CharacterMurderStats } from '../domain/characterMurderStats'

export class CharacterMurderStatsRepository extends RepositoryBase<CharacterMurderStats> {
  constructor() {
    super('character_murder_stats')
  }

  public async getCharacterMurderStats(characterId: string): Promise<CharacterMurderStats[]> {
    return this.getAll({
      character_id: characterId
    })
  }

  public async createCharacterMurderStats(data: Partial<CharacterMurderStats>): Promise<boolean> {
    return this.create(data)
  }

  public async updateCharacterMurderStats(data: Partial<CharacterMurderStats>): Promise<CharacterMurderStats | null> {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterMurderStats(id: string): Promise<boolean> {
    return this.delete(id)
  }
}
