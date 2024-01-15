import mongodb from 'mongodb'
const { ObjectId } = mongodb

import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'

export const channelService = {
    query,
    getById,
    // remove,
    // add,
    // update,
    // addToyMsg,
    // removeToyMsg
}

async function query(filterBy={txt:''}) {
    try {
        const criteria = {
            name: { $regex: filterBy.txt, $options: 'i' }
        }
        const collection = await dbService.getCollection('channel')
        var channels = await collection.find(criteria).toArray()
        return channels
    } catch (err) {
        logger.error('cannot find channels', err)
        throw err
    }
}

async function getById(channelId) {
    try {
        const collection = await dbService.getCollection('channel')
        const channel = collection.findOne({ _id: ObjectId(channelId) })
        return channel
    } catch (err) {
        logger.error(`while finding channel ${channelId}`, err)
        throw err
    }
}

// async function remove(toyId) {
//     try {
//         const collection = await dbService.getCollection('toy')
//         await collection.deleteOne({ _id: ObjectId(toyId) })
//     } catch (err) {
//         logger.error(`cannot remove toy ${toyId}`, err)
//         throw err
//     }
// }

// async function add(toy) {
//     try {
//         const collection = await dbService.getCollection('toy')
//         await collection.insertOne(toy)
//         return toy
//     } catch (err) {
//         logger.error('cannot insert toy', err)
//         throw err
//     }
// }

// async function update(toy) {
//     try {
//         const toyToSave = {
//             name: toy.name,
//             price: toy.price
//         }
//         const collection = await dbService.getCollection('toy')
//         await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
//         return toy
//     } catch (err) {
//         logger.error(`cannot update toy ${toy.id}`, err)
//         // logger.error(`cannot update toy ${toyId}`, err)
//         throw err
//     }
// }

// async function addToyMsg(toyId, msg) {
//     try {
//         msg.id = utilService.makeId()
//         const collection = await dbService.getCollection('toy')
//         await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
//         return msg
//     } catch (err) {
//         logger.error(`cannot add toy msg ${toyId}`, err)
//         throw err
//     }
// }

// async function removeToyMsg(toyId, msgId) {
//     try {
//         const collection = await dbService.getCollection('toy')
//         await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { msgs: {id: msgId} } })
//         return msgId
//     } catch (err) {
//         logger.error(`cannot add toy msg ${toyId}`, err)
//         throw err
//     }
// }

