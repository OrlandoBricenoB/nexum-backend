import { Router } from 'express'
import AccountController from '../controllers/accountController'
import { VerifyAuthentication } from '../../auth/middlewares/VerifyAuthentication'

const accountController = new AccountController()
const router = Router()

router.get('/', VerifyAuthentication, accountController.getAccount)
router.get('/sessions', VerifyAuthentication, accountController.getAccountSessions)
router.post('/selectCharacter', VerifyAuthentication, accountController.selectSessionCharacter)

export const AccountsRouter = router
