import { Router } from 'express'
import { CharacterPastLifeController } from '../controllers/characterPastLifeController'

const characterPastLifeController = new CharacterPastLifeController()
const router = Router()

router.get('/', characterPastLifeController.getAllCharacterPastLifes)
router.get('/:id', characterPastLifeController.getCharacterPastLife)

export const CharacterPastLifeRouter = router
