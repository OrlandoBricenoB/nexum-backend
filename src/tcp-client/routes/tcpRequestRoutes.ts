import TcpRequestsController from '../controllers/tcpRequests'
import { Hono } from 'hono'

const tcpRequests = new TcpRequestsController()
const router = new Hono()

router.get('/', tcpRequests.getAllData)
router.post('/characters/getByAccount', tcpRequests.getCharactersByAccount)

export const TcpRequestRouter = router
