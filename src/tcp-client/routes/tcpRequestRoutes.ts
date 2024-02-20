import { Router } from 'express'
import TcpRequestsController from '../controllers/tcpRequests'

const tcpRequests = new TcpRequestsController()
const router = Router()

router.get('/', tcpRequests.getAllData)
router.post('/characters/getByAccount', tcpRequests.getAllCharacters)

export const TcpRequestRouter = router
