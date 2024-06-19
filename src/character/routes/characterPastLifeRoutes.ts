import { CharacterPastLifeController } from '../controllers/characterPastLifeController'
import { VerifyAuthentication } from '../../auth/middlewares/VerifyAuthentication'
import { Hono } from 'hono'

const characterPastLifeController = new CharacterPastLifeController()
const router = new Hono()

router.get('/', VerifyAuthentication, characterPastLifeController.getAllCharacterPastLifes)
router.get('/:id', VerifyAuthentication, characterPastLifeController.getCharacterPastLife)

export const CharacterPastLifeRouter = router
