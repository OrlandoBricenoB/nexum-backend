import { SQL, eq, or, sql } from 'drizzle-orm'
import { Models } from '../domain/domains'
import {
  DataEntitiesByKey,
  Entities,
  EntitiesReturnType,
  EntityKeys,
  EntityModelMap,
} from '../types/Entities'
import { Database } from '../types/Database'
import { omit } from 'lodash'

export class RepositoryBase<K extends EntityKeys> {
  private readonly model: Models[EntityModelMap[K]]
  private readonly entity: Entities[K]
  protected readonly db: Database

  constructor(model: Models[EntityModelMap[K]], entity: Entities[K], db: Database) {
    this.model = model
    this.entity = entity
    this.db = db
  }

  protected async create(item: Partial<DataEntitiesByKey[K]>) {
    const [created] = await this.db
      .insert(this.model)
      .values(omit(item, ['id']) as any)
      .returning()

    return this.entity(created)
  }

  protected async update(id: string, item: Partial<DataEntitiesByKey[K]>) {
    const [updated] = await this.db
      .update(this.model)
      .set(item as any)
      .where(eq(this.model.id, id))
      .returning()

    return this.entity(updated)
  }

  protected async delete(id: string): Promise<void> {
    await this.db.delete(this.model).where(eq(this.model.id, id)).execute()
  }

  protected async getById(id: string) {
    const [result] = await this.db.select().from(this.model).where(eq(this.model.id, id)).execute()
    return this.entity(result)
  }

  protected async getBySQL(sql: SQL, limit: number = 999999) {
    const result = (await this.db
      .select()
      .from(this.model)
      .where(sql)
      .limit(limit)
      .execute()) as Array<DataEntitiesByKey[K]>

    return result.map((element) => this.entity(element))
  }

  public async getDuplicatedFields(
    item: EntitiesReturnType[K]
  ): Promise<Array<keyof DataEntitiesByKey[K]>> {
    const uniqueFields = item.getUniqueFields() as unknown as Array<keyof DataEntitiesByKey[K]>

    const conditions = uniqueFields.map(
      (key) => sql`${this.model[key as keyof typeof this.model]} = ${item[key]}`
    )
    const result = (await this.db
      .select()
      .from(this.model)
      .where(or(...conditions))
      .execute()) as Array<DataEntitiesByKey[K]>

    return uniqueFields.filter((key) => result.some((object) => object[key] === item[key]))
  }
}
