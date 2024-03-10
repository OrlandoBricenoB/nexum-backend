import { CharacterItem } from '../domain/characterItem'
import { CharacterItemsRepository } from '../repositories/characterItemRepository'

export class CharacterItemsService {
  private characterItemsRepository: CharacterItemsRepository

  constructor() {
    this.characterItemsRepository = new CharacterItemsRepository()
  }

  public async getCharacterItems(characterId: string): Promise<CharacterItem[]> {
    const skills = await this.characterItemsRepository.getCharacterItems(characterId)
    return skills.map(skill => CharacterItem.create(skill)) as CharacterItem[]
  }

  public async createCharacterItem(data: Partial<CharacterItem>): Promise<boolean> {
    return this.characterItemsRepository.createCharacterItem(data)
  }

  public async updateCharacterItem(data: Partial<CharacterItem>): Promise<CharacterItem | null> {
    const stats = await this.characterItemsRepository.updateCharacterItem(data)
    return stats
  }

  public async deleteCharacterItem(id: string): Promise<boolean> {
    return this.characterItemsRepository.deleteCharacterItem(id)
  }
}
