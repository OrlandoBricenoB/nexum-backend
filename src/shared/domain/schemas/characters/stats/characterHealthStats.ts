import { numeric, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { characters } from '../characters'

export const characterHealthStats = pgTable('character_health_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  vitality: numeric('vitality', { precision: 100, scale: 2 }).notNull().default('1.00'),
  stamina: numeric('stamina', { precision: 100, scale: 2 }).notNull().default('1.00'),
  mana: numeric('mana', { precision: 100, scale: 2 }).notNull().default('1.00'),
  manaReserve: numeric('mana_reserve', { precision: 100, scale: 2 }).notNull().default('1.00'),
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
