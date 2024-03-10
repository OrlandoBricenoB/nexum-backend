import { Entity } from '../../shared/domain/entity'

export class CharacterMurderStats extends Entity {
  public id: string
  public character_id: string
  public honor: number
  public death_count: number
  public kills: number
  public deaths: number
  public assists: number

  constructor(
    id: string,
    character_id: string,
    honor: number,
    death_count: number,
    kills: number,
    deaths: number,
    assists: number
  ) {
    super()

    this.id = id
    this.character_id = character_id
    this.honor = honor
    this.death_count = death_count
    this.kills = kills
    this.deaths = deaths
    this.assists = assists
  }
}
