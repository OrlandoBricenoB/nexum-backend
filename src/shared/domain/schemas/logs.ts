// ============================================================
// NEXUM - Drizzle Schema: chat_logs + session_logs
// ============================================================

import { pgTable, uuid, bigserial, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { accounts } from './accounts/accounts'
import { characters } from './characters/characters'

// ── Chat logs ────────────────────────────────────────────────
export const chatLogs = pgTable('chat_logs', {
  id: bigserial('id', { mode: 'bigint' }).primaryKey(),
  senderName: text('sender_name').notNull(),
  channel: text('channel').notNull(), // 'world'|'zone'|'party'|'whisper'
  message: text('message').notNull(),
  zoneId: integer('zone_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export type ChatLog = typeof chatLogs.$inferSelect
export type NewChatLog = typeof chatLogs.$inferInsert

// ── Session audit logs ───────────────────────────────────────
export const sessionLogs = pgTable('session_logs', {
  id: bigserial('id', { mode: 'bigint' }).primaryKey(),
  accountId: uuid('account_id')
    .notNull()
    .references(() => accounts.id),
  characterId: uuid('character_id').references(() => characters.id),
  event: text('event').notNull(), // 'login'|'logout'|'reconnect'|'kick'
  ipAddress: text('ip_address'),
  transport: text('transport'), // 'enet'|'ws'
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export type SessionLog = typeof sessionLogs.$inferSelect
export type NewSessionLog = typeof sessionLogs.$inferInsert
