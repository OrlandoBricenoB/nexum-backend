import { Entity } from '../../shared/domain/entity'

export class CharacterItem extends Entity {
  public id: string
  public character_id: string
  public item_id: string
  public quality: string
  public level: number

  constructor(id: string, character_id: string, item_id: string, quality: string, level: number) {
    super()

    this.id = id
    this.character_id = character_id
    this.item_id = item_id
    this.quality = quality
    this.level = level
  }
}
