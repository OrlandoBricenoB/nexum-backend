import { Entity } from '../../shared/domain/entity'

export class CharacterStats extends Entity {
  public id: string
  public character_id: string
  public level: number
  public exp: number
  public rebirths: number
  public skill_points: number
  public element_points: number
  public rebirth_points: number
  public rank: number

  constructor(
    id: string,
    character_id: string,
    level: number,
    exp: number,
    rebirths: number,
    skill_points: number,
    element_points: number,
    rebirth_points: number,
    rank: number
  ) {
    super()

    this.id = id
    this.character_id = character_id
    this.level = level
    this.exp = exp
    this.rebirths = rebirths
    this.skill_points = skill_points
    this.element_points = element_points
    this.rebirth_points = rebirth_points
    this.rank = rank
  }
}
