// ============================================================
// NEXUM - Drizzle Schema: characters
// ============================================================

import { pgTable, uuid, text, integer, bigint, timestamp, index } from 'drizzle-orm/pg-core'
import { accounts } from '../accounts/accounts'

export const characters = pgTable(
  'characters',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    accountId: uuid('account_id')
      .notNull()
      .references(() => accounts.id, { onDelete: 'cascade' }),
    name: text('name').notNull().unique(),
    kingdom: text('kingdom').notNull().default(''),
    division: text('division').notNull().default(''),
    clan: text('clan').notNull().default(''),
    profession: text('profession').notNull().default(''), // class
    slot: text('slot').notNull().default('-1'),

    // Appearances
    skinTone: text('skin_tone').notNull().default(''),
    hairstyle: text('hairstyle').notNull().default(''),
    facestyle: text('facestyle').notNull().default(''),
    gender: text('gender').notNull().default(''),

    // Progress & Stats
    level: integer('level').notNull().default(1),
    exp: bigint('exp', { mode: 'bigint' }).notNull().default(0n),
    rebirths: integer('rebirths').notNull().default(0),
    skillPoints: integer('skill_points').notNull().default(0),
    rebirthPoints: integer('rebirth_points').notNull().default(0),
    rank: text('rank').notNull().default(''),

    // Base Combat Stats
    baseAttack: integer('base_attack').notNull().default(10),
    baseDefense: integer('base_defense').notNull().default(5),

    // Health / Resources (Dynamic)
    hp: integer('hp').notNull().default(100),
    stamina: integer('stamina').notNull().default(100),
    mp: integer('mp').notNull().default(100),
    mpReserve: integer('mp_reserve').notNull().default(100),

    // Murder Stats
    honor: integer('honor').notNull().default(0),
    kills: integer('kills').notNull().default(0),
    deaths: integer('deaths').notNull().default(0),
    assists: integer('assists').notNull().default(0),
    deathCount: integer('death_count').notNull().default(0),

    // Wallet
    hesedias: integer('hesedias').notNull().default(0),
    nexumCoins: integer('nexum_coins').notNull().default(0),

    // Persistent position (Tile grid)
    zoneId: integer('zone_id').notNull().default(1),
    tileX: integer('tile_x').notNull().default(5),
    tileY: integer('tile_y').notNull().default(5),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    accountIdx: index('idx_characters_account').on(t.accountId),
  })
)

export type Character = typeof characters.$inferSelect
export type NewCharacter = typeof characters.$inferInsert
