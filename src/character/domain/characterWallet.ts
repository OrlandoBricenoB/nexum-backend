import { Entity } from '../../shared/domain/entity'

export class CharacterWallet extends Entity {
  public id: string
  public character_id: string
  public hesedias: number
  public nexum_coins: number

  constructor(id: string, character_id: string, hesedias: number, nexum_coins: number) {
    super()

    this.id = id
    this.character_id = character_id
    this.hesedias = hesedias
    this.nexum_coins = nexum_coins
  }
}
