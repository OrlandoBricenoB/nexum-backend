import { pick } from 'lodash'
import { Entity } from '../../shared/domain/entity'

export class Character extends Entity {
  public id: string
  public account_id: string
  public name: string
  public kingdom: string
  public division: string

  public static fields: string[] = ['id', 'account_id', 'name', 'kingdom', 'division']

  constructor(id: string, account_id: string, name: string, kingdom: string, division: string) {
    super()

    this.id = id
    this.account_id = account_id
    this.name = name
    this.kingdom = kingdom
    this.division = division
  }

  public static getUniqueFields() {
    return pick(Character.fields, ['id', 'account_id', 'name'])
  }
}
