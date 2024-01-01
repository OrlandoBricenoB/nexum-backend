import { Router } from 'express'
import AccountController from '../controllers/accountController'

const accountController = new AccountController()
const router = Router()

router.get('/', accountController.getAccount)
router.get('/sessions', accountController.getAccountSessions)

export const AccountsRouter = router
