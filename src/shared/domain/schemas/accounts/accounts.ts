// ============================================================
// NEXUM - Drizzle Schema: accounts
// ============================================================

import { pgTable, uuid, text, boolean, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

export const accounts = pgTable(
  'accounts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    image: text('image').notNull().default(''),
    isVerified: boolean('is_verified').notNull().default(false),
    isBanned: boolean('is_banned').notNull().default(false),
    banReason: text('ban_reason'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
  },
  (t) => ({
    usernameIdx: uniqueIndex('accounts_username_idx').on(t.username),
    emailIdx: uniqueIndex('accounts_email_idx').on(t.email),
  })
)

export type Account = typeof accounts.$inferSelect
export type NewAccount = typeof accounts.$inferInsert
