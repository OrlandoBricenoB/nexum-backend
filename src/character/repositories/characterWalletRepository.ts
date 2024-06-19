import { eq } from 'drizzle-orm'
import {
  CharacterWallet,
  CharacterWalletData,
} from '../../shared/domain/entities/characters/inventory/CharacterWallet'
import { characterWallets } from '../../shared/domain/schemas/characters/inventory/characterWallets'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Database } from '../../shared/types/Database'

export class CharacterWalletRepository extends RepositoryBase<'CharacterWallet'> {
  constructor(db: Database) {
    super(characterWallets, CharacterWallet, db)
  }

  public async getCharacterWallet(characterId: string) {
    const [result] = await this.db
      .select()
      .from(characterWallets)
      .where(eq(characterWallets.characterId, characterId))
      .limit(1)
      .execute()
    return CharacterWallet(result)
  }

  public async createCharacterWallet(data: Partial<CharacterWalletData>) {
    return this.create(data)
  }

  public async updateCharacterWallet(data: Partial<CharacterWalletData>) {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterWallet(id: string) {
    return this.delete(id)
  }
}
