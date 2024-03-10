import { Entity } from '../../shared/domain/entity'

export class CharacterHealthStats extends Entity {
  public id: string
  public character_id: string
  public vitality: number
  public stamina: number
  public mana: number
  public mana_reserve: number

  constructor(id: string, character_id: string, vitality: number, stamina: number, mana: number, mana_reserve: number) {
    super()

    this.id = id
    this.character_id = character_id
    this.vitality = vitality
    this.stamina = stamina
    this.mana = mana
    this.mana_reserve = mana_reserve
  }
}
