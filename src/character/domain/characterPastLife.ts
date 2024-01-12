import { Entity } from '../../shared/domain/entity'

export class CharacterPastLife extends Entity {
  public id: string
  public character_id: string
  public name: string
  public kingdon: string
  public rank_id: string
  public rebirth: number
  public honor: number
  public kills: number
  public deaths: number
  public assists: number

  constructor(
    id: string,
    character_id: string,
    name: string,
    kingdon: string,
    rank_id: string,
    rebirth: number,
    honor: number,
    kills: number,
    deaths: number,
    assists: number
  ) {
    super()

    this.id = id
    this.character_id = character_id
    this.name = name
    this.kingdon = kingdon
    this.rank_id = rank_id
    this.rebirth = rebirth
    this.honor = honor
    this.kills = kills
    this.deaths = deaths
    this.assists = assists
  }
}
