import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { CharacterInventorySlot } from '../domain/characterInventorySlot'

export class CharacterInventorySlotRepository extends RepositoryBase<CharacterInventorySlot> {
  constructor() {
    super('character_inventory_slots')
  }

  public async getCharacterInventorySlot(characterId: string): Promise<CharacterInventorySlot[]> {
    return this.getAll({
      character_id: characterId
    })
  }

  public async createCharacterInventorySlot(data: Partial<CharacterInventorySlot>): Promise<boolean> {
    return this.create(data)
  }

  public async updateCharacterInventorySlot(
    data: Partial<CharacterInventorySlot>
  ): Promise<CharacterInventorySlot | null> {
    if (!data.id) return null
    return this.update(data.id, data)
  }
}
