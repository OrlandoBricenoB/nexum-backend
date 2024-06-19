import { AuthController } from '../controllers/AuthController'
import { Hono } from 'hono'

const router = new Hono()
const authController = new AuthController()

router.post('/login', authController.login)

export const AuthRouter = router
