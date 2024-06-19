import { NeonHttpDatabase } from 'drizzle-orm/neon-http'

export type Database = NeonHttpDatabase<Record<string, never>>
