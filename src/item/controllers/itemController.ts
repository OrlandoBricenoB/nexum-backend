import { Request, Response } from 'express'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { ItemService } from '../services/itemService'
import { NotFound } from '../../shared/errors/customErrors'

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

  public async getItem(req: Request, res: Response) {
    const { id } = req.params

    const item = await this.itemService.getItem(id)

    if (item) {
      res.json(item.getInfo())
    } else {
      const notFoundError = new NotFound('ITEM_NOT_FOUND')
      res.status(notFoundError.status).send({ error: notFoundError })
    }
  }
}
