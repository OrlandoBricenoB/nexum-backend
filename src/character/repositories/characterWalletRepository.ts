import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { CharacterWallet } from '../domain/characterWallet'

export class CharacterWalletRepository extends RepositoryBase<CharacterWallet> {
  constructor() {
    super('character_wallets')
  }

  public async getCharacterWallet(characterId: string): Promise<CharacterWallet[]> {
    return this.getAll({
      character_id: characterId
    })
  }

  public async createCharacterWallet(data: Partial<CharacterWallet>): Promise<boolean> {
    return this.create(data)
  }

  public async updateCharacterWallet(data: Partial<CharacterWallet>): Promise<CharacterWallet | null> {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterWallet(id: string): Promise<boolean> {
    return this.delete(id)
  }
}
