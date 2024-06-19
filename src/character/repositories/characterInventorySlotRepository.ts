import { eq } from 'drizzle-orm'
import { database } from '../../config/databaseConfig'
import {
  CharacterInventorySlot,
  CharacterInventorySlotData,
} from '../../shared/domain/entities/characters/inventory/CharacterInventorySlot'
import { characterInventorySlots } from '../../shared/domain/schemas/characters/inventory/characterInventorySlots'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'

export class CharacterInventorySlotRepository extends RepositoryBase<'CharacterInventorySlot'> {
  constructor() {
    super(characterInventorySlots, CharacterInventorySlot)
  }

  public async getCharacterInventorySlot(characterId: string) {
    const [result] = await database
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
