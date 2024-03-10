import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { CharacterItem } from '../domain/characterItem'

export class CharacterItemsRepository extends RepositoryBase<CharacterItem> {
  constructor() {
    super('character_items')
  }

  public async getCharacterItems(characterId: string): Promise<CharacterItem[]> {
    return this.getAll({
      character_id: characterId
    })
  }

  public async createCharacterItem(data: Partial<CharacterItem>): Promise<boolean> {
    return this.create(data)
  }

  public async updateCharacterItem(data: Partial<CharacterItem>): Promise<CharacterItem | null> {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterItem(id: string): Promise<boolean> {
    return this.delete(id)
  }
}
