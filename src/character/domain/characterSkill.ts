import { Entity } from '../../shared/domain/entity'

export class CharacterSkill extends Entity {
  public id: string
  public character_id: string
  public level: number
  public points: number
  public skill_slug: string

  constructor(id: string, character_id: string, level: number, points: number, skill_slug: string) {
    super()

    this.id = id
    this.character_id = character_id
    this.level = level
    this.points = points
    this.skill_slug = skill_slug
  }
}
