import { Router } from 'express'
import AccountController from '../controllers/accountController'

const accountController = new AccountController()
const router = Router()

router.get('/', accountController.getAccount)

export const AccountsRouter = router
