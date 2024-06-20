import { CharacterController } from '../controllers/characterController'
import { VerifyAuthentication } from '../../auth/middlewares/VerifyAuthentication'
import { Hono } from 'hono'

const characterController = new CharacterController()
const router = new Hono()

router.get('/', VerifyAuthentication, characterController.getAllCharacters)
router.get('/getAllByAccount', VerifyAuthentication, characterController.getCharactersByAccount)
router.post('/create', VerifyAuthentication, characterController.createCharacter)
router.get('/session', VerifyAuthentication, characterController.getCharacterSession)
router.get('/:id', VerifyAuthentication, characterController.getCharacter)
router.delete('/delete/:id', VerifyAuthentication, characterController.deleteCharacter)

export const CharacterRoutes = router
