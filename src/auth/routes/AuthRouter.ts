import { AuthController } from '../controllers/AuthController'
import { Hono } from 'hono'

const router = new Hono()
const authController = new AuthController()

router.post('/login', authController.login)
router.put('/select-character', authController.selectCharacter)

export const AuthRouter = router
