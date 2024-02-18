import { Router } from 'express'
import { CharacterController } from '../controllers/characterController'
import { VerifyAuthentication } from '../../auth/middlewares/VerifyAuthentication'

const characterController = new CharacterController()
const router = Router()

router.get('/', VerifyAuthentication, characterController.getAllCharacters)
router.get('/getAllByAccount', VerifyAuthentication, characterController.getCharactersByAccount)
router.get('/:id', VerifyAuthentication, characterController.getCharacter)

export const CharacterRoutes = router
