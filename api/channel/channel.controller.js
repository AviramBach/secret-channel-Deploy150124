import { channelService } from './channel.service.js'
import { logger } from '../../services/logger.service.js'

export async function getChannels(req, res) {
    try {
        const filterBy = {
            txt: req.query.txt || '',
        }
        logger.debug('Getting Channels', filterBy)
        const channels = await channelService.query(filterBy)
        res.json(channels)
    } catch (err) {
        logger.error('Failed to get channels', err)
        res.status(500).send({ err: 'Failed to get channels' })
    }
}

export async function getChannelById(req, res) {
    try {
        const channelId = req.params.id
        const channel = await channelService.getById(channelId)
        res.json(channel)
    } catch (err) {
        logger.error('Failed to get channel', err)
        res.status(500).send({ err: 'Failed to get channel' })
    }
}

// export async function addToy(req, res) {
//     const { loggedinUser } = req

//     try {
//         const toy = req.body
//         toy.owner = loggedinUser
//         const addedToy = await toyService.add(toy)
//         res.json(addedToy)
//     } catch (err) {
//         logger.error('Failed to add toy', err)
//         res.status(500).send({ err: 'Failed to add toy' })
//     }
// }

// export async function updateToy(req, res) {
//     try {
//         const toy = req.body
//         const updatedToy = await toyService.update(toy)
//         res.json(updatedToy)
//     } catch (err) {
//         logger.error('Failed to update toy', err)
//         res.status(500).send({ err: 'Failed to update toy' })
//     }
// }

// export async function removeToy(req, res) {
//     try {
//         const toyId = req.params.id
//         await toyService.remove(toyId)
//         res.send()
//     } catch (err) {
//         logger.error('Failed to remove toy', err)
//         res.status(500).send({ err: 'Failed to remove toy' })
//     }
// }

// export async function addToyMsg(req, res) {
//     const { loggedinUser } = req
//     try {
//         const toyId = req.params.id
//         const msg = {
//             txt: req.body.txt,
//             by: loggedinUser,
//         }
//         const savedMsg = await toyService.addToyMsg(toyId, msg)
//         res.json(savedMsg)
//     } catch (err) {
//         logger.error('Failed to update toy', err)
//         res.status(500).send({ err: 'Failed to update toy' })
//     }
// }

// export async function removeToyMsg(req, res) {
//     const { loggedinUser } = req
//     try {
//         const toyId = req.params.id
//         const { msgId } = req.params

//         const removedId = await toyService.removeToyMsg(toyId, msgId)
//         res.send(removedId)
//     } catch (err) {
//         logger.error('Failed to remove toy msg', err)
//         res.status(500).send({ err: 'Failed to remove toy msg' })
//     }
// }