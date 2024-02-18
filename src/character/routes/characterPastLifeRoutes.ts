import { Router } from 'express'
import { CharacterPastLifeController } from '../controllers/characterPastLifeController'
import { VerifyAuthentication } from '../../auth/middlewares/VerifyAuthentication'

const characterPastLifeController = new CharacterPastLifeController()
const router = Router()

router.get('/', VerifyAuthentication, characterPastLifeController.getAllCharacterPastLifes)
router.get('/:id', VerifyAuthentication, characterPastLifeController.getCharacterPastLife)

export const CharacterPastLifeRouter = router
