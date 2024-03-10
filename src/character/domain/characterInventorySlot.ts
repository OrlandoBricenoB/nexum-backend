import { Entity } from '../../shared/domain/entity'

export class CharacterInventorySlot extends Entity {
  public id: string
  public character_id: string
  public inventory: number
  public character_item_id: string
  public slot: string
  public stack: number

  constructor(
    id: string,
    character_id: string,
    inventory: number,
    character_item_id: string,
    slot: string,
    stack: number
  ) {
    super()

    this.id = id
    this.character_id = character_id
    this.inventory = inventory
    this.character_item_id = character_item_id
    this.slot = slot
    this.stack = stack
  }
}
