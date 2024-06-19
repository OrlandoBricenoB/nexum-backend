import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { characters } from '../characters'

export const characterStats = pgTable('character_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  level: integer('level').notNull().default(0),
  exp: integer('exp').notNull().default(0),
  rebirths: integer('rebirths').notNull().default(0),
  skillPoints: integer('skill_points').notNull().default(0),
  elementPoints: integer('element_points').notNull().default(0),
  rebirthPoints: integer('rebirth_points').notNull().default(0),
  rank: text('rank').notNull().default(''),
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
