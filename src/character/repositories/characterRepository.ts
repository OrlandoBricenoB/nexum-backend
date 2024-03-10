import { FindQuery } from '../../server/domain/FindQuery'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Character } from '../domain/character'

export class CharacterRepository extends RepositoryBase<Character> {
  constructor() {
    super('characters')
  }

  public async getAllCharacters(query?: FindQuery<Character>): Promise<Character[]> {
    return this.getAll(query)
  }

  public async getCharacter(id: string): Promise<Character | null> {
    return this.getByID(id)
  }

  public async createCharacter(data: Partial<Character>): Promise<boolean> {
    return this.create(data)
  }

  public async updateCharacter(data: Partial<Character>): Promise<Character | null> {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacter(id: string): Promise<boolean> {
    return this.delete(id)
  }
}
