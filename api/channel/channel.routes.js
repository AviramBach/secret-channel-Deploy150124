import express from 'express'
// import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { getChannels, getChannelById } from './channel.controller.js'

export const channelRoutes = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

channelRoutes.get('/', log, getChannels)
channelRoutes.get('/:id', getChannelById)
// toyRoutes.post('/', requireAuth, addToy)
// toyRoutes.put('/:id', requireAuth, updateToy)
// toyRoutes.delete('/:id', requireAuth, removeToy)

// router.delete('/:id', requireAuth, requireAdmin, removeCar)
// toyRoutes.delete('/:id/msg/:msgId', requireAuth, removeToyMsg)