import { eq } from 'drizzle-orm'
import { database } from '../../config/databaseConfig'
import {
  CharacterItem,
  CharacterItemData,
} from '../../shared/domain/entities/characters/inventory/CharacterItem'
import { characterItems } from '../../shared/domain/schemas/characters/inventory/characterItems'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'

export class CharacterItemsRepository extends RepositoryBase<'CharacterItem'> {
  constructor() {
    super(characterItems, CharacterItem)
  }

  public async getCharacterItems(characterId: string) {
    const [result] = await database
      .select()
      .from(characterItems)
      .where(eq(characterItems.characterId, characterId))
      .limit(1)
      .execute()
    return CharacterItem(result)
  }

  public async createCharacterItem(data: Partial<CharacterItemData>) {
    return this.create(data)
  }

  public async updateCharacterItem(data: Partial<CharacterItemData>) {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterItem(id: string) {
    return this.delete(id)
  }
}
