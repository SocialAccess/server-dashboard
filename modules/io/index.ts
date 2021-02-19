import { Module } from '@nuxt/types'
import IO from 'socket.io'
import http from 'http'
import path from 'path'

interface Options {
	a: boolean
	b: number
	c: string
}

function IOServer(server: http.Server, { host, port }: any) {
	console.info('attaching IO server')

	const appURL = host + port ? `:${port}` : ''
	const io = new IO.Server(server, {
		cors: {
			// running on different port so cors is needed.
			origin: appURL,
			methods: ['*'],
		},
	})
}

const IOModule: Module<Options> = function (options) {
	this.nuxt.hook('listen', IOServer)

	this.addPlugin(path.resolve(__dirname, 'plugin.ts'))
}

export default IOModule
