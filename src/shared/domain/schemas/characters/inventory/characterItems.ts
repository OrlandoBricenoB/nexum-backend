import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { characters } from '../characters'

export const characterItems = pgTable('character_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  level: integer('level').notNull().default(1),
  quality: text('quality').notNull().default(''),
  item_id: text('item_id').notNull().default(''),
  characterId: uuid('character_id')
    .references(() => characters.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})
