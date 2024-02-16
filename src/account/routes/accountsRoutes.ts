import { Router } from 'express'
import AccountController from '../controllers/accountController'

const accountController = new AccountController()
const router = Router()

router.get('/', accountController.getAccount)
router.get('/sessions', accountController.getAccountSessions)
router.get('/session/:id', accountController.getAccountSessionById)

export const AccountsRouter = router
