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

  public async createCharacter(data: Partial<Character>) {
    return this.create(data)
  }
}
