/* eslint-disable no-undef */
'use strict'

import 'dotenv/config'

import Hapi from '@hapi/hapi'
import noteRoutes from './routes/notes.js'

const port = process.env.PORT ?? 3033
const host = process.env.HOST ?? 'localhost'
const routes = { 
	cors: {
		origin: ['*']
	} 
}

const ENV = { port, host, routes }

const init = async () => {
	const server = Hapi.server(ENV)

	server.route(noteRoutes)
    

	await server.start()

	console.log(`server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
	console.log(err)
	process.exit(1)
})

init()