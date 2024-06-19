import { CharacterWalletData } from '../../shared/domain/entities/characters/inventory/CharacterWallet'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterWalletRepository } from '../repositories/characterWalletRepository'

export class CharacterWalletService {
  private characterWalletRepository: CharacterWalletRepository

  constructor() {
    this.characterWalletRepository = new CharacterWalletRepository()
  }

  public async getCharacterWallet(characterId: string) {
    const data = await this.characterWalletRepository.getCharacterWallet(characterId)
    return data as unknown as EntitiesReturnType['CharacterWallet']
  }

  public async createCharacterWallet(data: Partial<CharacterWalletData>) {
    return this.characterWalletRepository.createCharacterWallet(
      data
    ) as unknown as EntitiesReturnType['CharacterWallet']
  }

  public async updateCharacterWallet(data: Partial<CharacterWalletData>) {
    const stats = await this.characterWalletRepository.updateCharacterWallet(data)
    return stats as unknown as EntitiesReturnType['CharacterWallet']
  }

  public async deleteCharacterWallet(id: string) {
    return this.characterWalletRepository.deleteCharacterWallet(id)
  }
}
