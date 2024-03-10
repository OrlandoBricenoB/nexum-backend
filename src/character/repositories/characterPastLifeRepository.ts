import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { CharacterPastLife } from '../domain/characterPastLife'

export class CharacterPastLifeRepository extends RepositoryBase<CharacterPastLife> {
  constructor() {
    super('character_past_lifes')
  }

  public async getAllCharacterPastLifes(): Promise<CharacterPastLife[]> {
    return this.getAll()
  }

  public async getCharacterPastLife(id: string): Promise<CharacterPastLife | null> {
    return this.getByID(id)
  }

  public async createCharacterPastLife(data: Partial<CharacterPastLife>): Promise<boolean> {
    return this.create(data)
  }

  public async deleteCharacterPastLife(id: string): Promise<boolean> {
    return this.delete(id)
  }
}
