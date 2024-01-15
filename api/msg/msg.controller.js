// import {logger} from '../../services/logger.service.js'
// import {socketService} from '../../services/socket.service.js'
// import {userService} from '../user/user.service.js'
// import {authService} from '../auth/auth.service.js'
import { msgService } from './msg.service.js'
import { channelService } from '../channel/channel.service.js'

export async function getMsgs(req, res) {
    try {
        const msgs = await msgService.query(req.query)
        res.send(msgs)
    } catch (err) {
        logger.error('Cannot get msgs', err)
        res.status(400).send({ err: 'Failed to get msgs' })
    }
}

export async function deleteMsg(req, res) {
    try {
        const deletedCount = await msgService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove msg' })
        }
    } catch (err) {
        logger.error('Failed to delete msg', err)
        res.status(400).send({ err: 'Failed to delete msg' })
    }
}


export async function addMsg(req, res) {
    
    // var {loggedinUser} = req
 
    try {
        var msg = req.body
        
        // msg.byUserId = loggedinUser._id
        msg = await msgService.add(msg)
        // res.json(msg)
        // msg.aboutChannel = await channelService.getById(msg.aboutChannelId)
        // prepare the updated review for sending out
        // console.log('hellow', review)
        
        

        // loggedinUser = await userService.update(loggedinUser)
        // msg.byUser = loggedinUser

        // User info is saved also in the login-token, update it
        // const loginToken = authService.getLoginToken(loggedinUser)
        // res.cookie('loginToken', loginToken)

        // delete msg.aboutChannelId
        // delete msg.byUserId

        // socketService.broadcast({type: 'review-added', data: review, userId: loggedinUser._id})
        // socketService.emitToUser({type: 'review-about-you', data: review, userId: review.aboutUser._id})
        
        // const fullUser = await userService.getById(loggedinUser._id)
        // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

        console.log(msg);
        res.send(msg)
    } catch (err) {
        // logger.error('Failed to add msg', err)
        res.status(400).send({ err: 'Failed to add msg' })
    }
}

