import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { characters } from '../characters'

export const characterSkills = pgTable('character_skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  level: integer('level').notNull().default(0),
  points: integer('points').notNull().default(0),
  skillId: text('skill_id').notNull().default(''),
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
