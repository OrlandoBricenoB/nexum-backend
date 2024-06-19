import AccountController from '../controllers/accountController'
import { VerifyAuthentication } from '../../auth/middlewares/VerifyAuthentication'
import { Hono } from 'hono'

const accountController = new AccountController()
const router = new Hono()

router.get('/', VerifyAuthentication, accountController.getAccount)
router.get('/sessions', VerifyAuthentication, accountController.getAccountSessions)
router.post('/selectCharacter', VerifyAuthentication, accountController.selectSessionCharacter)
router.post('/create', accountController.createAccount)

export const AccountsRouter = router
