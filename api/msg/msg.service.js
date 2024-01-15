import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { asyncLocalStorage } from '../../services/als.service.js'
import mongodb from 'mongodb'
import { log } from '../../middlewares/logger.middleware.js'
const { ObjectId } = mongodb




export const msgService = {
    query,
    remove,
    add
}

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('msg')
        // const msgs = await collection.find(criteria).toArray()
        var msgs = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'byUserId',
                    from: 'users',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    localField: 'aboutChannelId',
                    from: 'msgs',
                    foreignField: '_id',
                    as: 'aboutChannel'
                }
            },
            {
                $unwind: '$aboutChannel'
            },
            {
                $project: {
                    _id: 1,
                    txt: 1,
                    byUser: { _id: 1, fullname: 1 },
                    aboutChannel: { _id: 1, name: 1 }
                }
            }
        ]).toArray()
        // console.log('msg', msgs);
        // msgs = msgs.map(msg => {
        //     msg.byUser = { _id: msg.byUser._id, fullname: msg.byUser.fullname }
        //     msg.aboutToy = { _id: msg.aboutToy._id, name: msg.aboutToy.name }
        //     console.log('msg1:', msg)
        //     delete msg.byUserId
        //     delete msg.aboutToyId
        //     console.log('msg2:', msg)
        //     return msg
        // })

        return msgs
    } catch (err) {
        logger.error('cannot find msgs', err)
        throw err
    }

}

async function remove(msgId) {
    try {
        const store = asyncLocalStorage.getStore()
        // console.log('store:', store)
        const { loggedinUser } = store
        const collection = await dbService.getCollection('msg')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(msgId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove msg ${msgId}`, err)
        throw err
    }
}



async function add(msg) {
    try {
        const collection = await dbService.getCollection('channel');
        const channelId = msg.channelId; // Assuming this is the channel ID
    
        const newMessage = {
            time: msg.time, // Update with the actual time
            from: msg.from, // Update with the sender's name or ID
            txt: msg.txt // Update with the message text
        }
    
        await collection.updateOne(
            { _id: ObjectId(channelId) },
            { $push: { chatHistory: JSON.stringify(newMessage) } }
        );
    
        return newMessage;
    } catch (err) {
        logger.error('cannot insert msg', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = ObjectId(filterBy.byUserId)
    if (filterBy.aboutToyId) criteria.aboutToyId = ObjectId(filterBy.aboutToyId)
    return criteria
}



