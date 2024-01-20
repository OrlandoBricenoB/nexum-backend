import { Entity } from '../../shared/domain/entity'

export class Item extends Entity {
  public name: string
  public type: string
  public image: string
  public quality: string
  public is_stackable: boolean
  public haves_buffs: boolean
  public have_requirements: boolean

  constructor(
    name: string,
    type: string,
    image: string,
    quality: string,
    is_stackable: boolean,
    haves_buffs: boolean,
    have_requirements: boolean
  ) {
    super()

    this.name = name
    this.type = type
    this.image = image
    this.quality = quality
    this.is_stackable = is_stackable
    this.haves_buffs = haves_buffs
    this.have_requirements = have_requirements
  }
}
