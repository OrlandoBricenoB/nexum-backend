import { CharacterWallet } from '../domain/characterWallet'
import { CharacterWalletRepository } from '../repositories/characterWalletRepository'

export class CharacterWalletService {
  private characterWalletRepository: CharacterWalletRepository

  constructor() {
    this.characterWalletRepository = new CharacterWalletRepository()
  }

  public async getCharacterWallet(characterId: string): Promise<CharacterWallet | null> {
    const data = await this.characterWalletRepository.getCharacterWallet(characterId)
    return data.length ? CharacterWallet.create(data[0]) : null
  }

  public async createCharacterWallet(data: Partial<CharacterWallet>): Promise<boolean> {
    return this.characterWalletRepository.createCharacterWallet(data)
  }

  public async updateCharacterWallet(data: Partial<CharacterWallet>): Promise<CharacterWallet | null> {
    const stats = await this.characterWalletRepository.updateCharacterWallet(data)
    return stats
  }

  public async deleteCharacterWallet(id: string): Promise<boolean> {
    return this.characterWalletRepository.deleteCharacterWallet(id)
  }
}
