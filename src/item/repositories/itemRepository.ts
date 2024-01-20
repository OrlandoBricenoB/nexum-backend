import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Item } from '../domain/item'

export class ItemRepository extends RepositoryBase<Item> {
  constructor() {
    super('items')
  }

  public async getAllItems(): Promise<Item[]> {
    return this.getAll()
  }

  public async getItem(id: string): Promise<Item | null> {
    return this.getByID(id)
  }
}
