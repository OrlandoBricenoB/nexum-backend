import { Router } from 'express'
import { ItemController } from '../controllers/itemController'

const itemController = new ItemController()
const router = Router()

router.get('/', itemController.getAllItems)
router.get('/:id', itemController.getItem)

export const ItemsRouter = router
