import http from 'http'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import { logger } from './services/logger.service.js'
logger.info('server.js loaded...')

const app = express()
const server = http.createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())
app.use(express.static('dist-copy'))


if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'dist-copy')))
    console.log('__dirname: ', __dirname)
} else {
    // Configuring CORS
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: [
            'http://127.0.0.1:5173',
            'http://localhost:5173',
            'http://localhost:5174',
            'http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://127.0.0.1:8080',
            'http://localhost:8080',
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'

import { msgRoutes } from './api/msg/msg.routes.js'
import { channelRoutes } from './api/channel/channel.routes.js'
import { setupSocketAPI } from './services/socket.service.js'

// routes
import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.js'
app.all('*', setupAsyncLocalStorage)


app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

app.use('/api/channel', channelRoutes)
app.use('/api/msg', msgRoutes)
setupSocketAPI(server)


// Make every unmatched server-side-route fall back to index.html
// So when requesting http://localhost:3030/index.html/toy/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue-router to take it from there

// app.get('/**', (req, res) => {
//     res.sendFile(path.resolve('public/index.html'))
// })

const port = process.env.PORT || 3030

server.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})