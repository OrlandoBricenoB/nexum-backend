import { eq } from 'drizzle-orm'
import {
  CharacterInventorySlot,
  CharacterInventorySlotData,
} from '../../shared/domain/entities/characters/inventory/CharacterInventorySlot'
import { characterInventorySlots } from '../../shared/domain/schemas/characters/inventory/characterInventorySlots'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Database } from '../../shared/types/Database'

export class CharacterInventorySlotRepository extends RepositoryBase<'CharacterInventorySlot'> {
  constructor(db: Database) {
    super(characterInventorySlots, CharacterInventorySlot, db)
  }

  public async getCharacterInventorySlot(characterId: string) {
    const [result] = await this.db
      .select()
      .from(characterInventorySlots)
      .where(eq(characterInventorySlots.characterId, characterId))
      .limit(1)
      .execute()
    return CharacterInventorySlot(result)
  }

  public async createCharacterInventorySlot(data: Partial<CharacterInventorySlotData>) {
    return this.create(data)
  }

  public async updateCharacterInventorySlot(data: Partial<CharacterInventorySlotData>) {
    if (!data.id) return null
    return this.update(data.id, data)
  }
}
