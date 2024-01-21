import { Request, Response } from 'express'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { ItemService } from '../services/itemService'

export class ItemController extends ControllerBase {
  private itemService: ItemService

  constructor() {
    super()

    this.itemService = new ItemService()
  }

  public async getAllItems(req: Request, res: Response): Promise<void> {
    const { ids = '' } = req.query
    const parsedIds = ids.toString().split(',')

    const items = await this.itemService.getAllItems(parsedIds)

    res.json(items)
  }
}
