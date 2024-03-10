import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { CharacterAppearance } from '../domain/characterAppearance'

export class CharacterAppearanceRepository extends RepositoryBase<CharacterAppearance> {
  constructor() {
    super('character_appearances')
  }

  public async getCharacterAppearance(characterId: string): Promise<CharacterAppearance[]> {
    return this.getAll({
      character_id: characterId
    })
  }

  public async createCharacterAppearance(data: Partial<CharacterAppearance>): Promise<boolean> {
    return this.create(data)
  }

  public async updateCharacterAppearance(data: Partial<CharacterAppearance>): Promise<CharacterAppearance | null> {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterAppearance(id: string): Promise<boolean> {
    return this.delete(id)
  }
}
