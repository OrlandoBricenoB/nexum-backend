import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/server/database/migrations',
  schema: './src/shared/domain/domains.ts',
  dialect: 'postgresql',
  migrations: {
    table: '__drizzle_migrations',
    schema: 'public',
  },
})
