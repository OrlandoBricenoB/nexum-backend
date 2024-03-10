import { Entity } from '../../shared/domain/entity'

export class CharacterAppearance extends Entity {
  public id: string
  public character_id: string
  public skin_tone: string
  public hairstyle: string
  public facestyle: string
  public gender: string

  constructor(
    id: string,
    character_id: string,
    skin_tone: string,
    hairstyle: string,
    facestyle: string,
    gender: string
  ) {
    super()

    this.id = id
    this.character_id = character_id
    this.skin_tone = skin_tone
    this.hairstyle = hairstyle
    this.facestyle = facestyle
    this.gender = gender
  }
}
