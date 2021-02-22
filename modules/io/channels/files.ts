import IO, { Socket } from 'socket.io'
import fs from 'fs'
import path from 'path'

const serverFolder = path.resolve(
	process.env.dirname as string,
	'assets/minecraft-server'
)

let channel: IO.Namespace

export default function (io: IO.Server) {
	channel = io.of('/files')

	channel.on('connection', (socket: Socket) => {
		console.info('files client connected')

		socket.on('list', listFiles)
	})
}

function listFiles(this: Socket, folderPath: string) {
	const glob = require('glob')

	let folder = glob.sync(path.join(serverFolder, folderPath, '**'))

	folder = folder.map((p: string) => {
		return path.basename(p)
	})

	console.log(folder)
}

function formatBytes(a: any, b = 2) {
	if (0 === a) return '0 Bytes'
	const c = 0 > b ? 0 : b,
		d = Math.floor(Math.log(a) / Math.log(1024))
	return (
		parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
		' ' +
		['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
	)
}
