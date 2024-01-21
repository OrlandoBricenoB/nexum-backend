import { Item } from '../domain/item'
import { ItemRepository } from '../repositories/itemRepository'

export class ItemService {
  private itemRepository: ItemRepository

  constructor() {
    this.itemRepository = new ItemRepository()
  }

  public async getAllItems(ids: string[]): Promise<Item[]> {
    const allItems = await this.itemRepository.getAllItems()

    let selectedItems: Item[]

    if (ids.length === 0) {
      selectedItems = allItems
    } else {
      selectedItems = allItems.filter(item => ids.includes(item.id!))
    }

    return selectedItems.map(item => Item.create(item)) as Item[]
  }

  public async getItem(id: string): Promise<Item | null> {
    const item = await this.itemRepository.getItem(id)

    return Item.create(item)
  }
}
