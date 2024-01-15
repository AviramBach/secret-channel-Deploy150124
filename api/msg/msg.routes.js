import express from 'express'
// import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
// import { log } from '../../middlewares/logger.middleware.js'

import {addMsg, getMsgs, deleteMsg} from './msg.controller.js'
const router = express.Router()

router.get('/', getMsgs)
router.post('/', addMsg)
router.delete('/:id', deleteMsg)

export const msgRoutes = router