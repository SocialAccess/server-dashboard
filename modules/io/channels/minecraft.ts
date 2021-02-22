import IO, { Socket } from 'socket.io'
import http from 'https'
import fs from 'fs'
import path from 'path'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'

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

const downloadPath = path.resolve(
	process.env.dirname as string,
	'assets/minecraft-server'
)

const serverFolder = path.resolve(
	process.env.dirname as string,
	'assets/minecraft-server'
)
const serverJarPath = path.resolve(serverFolder, 'server.jar')
const serverStartCommands = ['-Xms2G', '-Xmx2G', '-jar', serverJarPath]

let serverLogs = []

let mcServer: ChildProcessWithoutNullStreams | false
let channel: IO.Namespace

export default function (io: IO.Server) {
	channel = io.of('/minecraft')

	channel.on('connection', (socket: Socket) => {
		socket.on('download-server', downloadServer(socket))

		socket.on('minecraft-server-start', startServer)
		socket.on('minecraft-server-restart', restartServer)
		socket.on('minecraft-server-stop', stopServer)
		socket.on('minecraft-server-status', getServerStatus(socket))
	})
}

function downloadServer(socket: Socket) {
	return (url: string) => {
		if (!fs.existsSync(downloadPath)) {
			fs.mkdirSync(downloadPath)
		}

		const filePath = path.resolve(downloadPath, 'server.jar')
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
		}

		const jarFile = fs.createWriteStream(filePath)

		let totalSize: number = 0
		let downloadedSize: number = 0
		let progress: number = 0

		const request = http.get(url, function (response) {
			response.pipe(jarFile)
			response.on('data', (buffer: Buffer) => {
				downloadedSize += buffer.byteLength

				progress = (downloadedSize / totalSize) * 100
				socket.emit('download-server-progress', progress)
			})

			totalSize = Number(response.headers['content-length'])
			socket.emit('download-server-started')
		})

		request.on('close', () => {
			jarFile.close()

			fs.chownSync(filePath, 1000, 1000)

			channel.emit('download-server-finished')
		})
	}
}

function serverFolderExists() {
	return fs.existsSync(serverFolder)
}

function serverJarExists() {
	return fs.existsSync(serverJarPath)
}

function spawnMCServer() {
	if (!serverFolderExists() || !serverJarExists()) return false

	let server = spawn('java', serverStartCommands, {
		cwd: serverFolder,
	})

	process.on('exit', server.kill)
	return server
}

function serverLogMessage(buffer: Buffer) {
	let message: string = buffer.toString()
	const startCatchReg = /^.*(Done \(?\d*.?\d*s\)! For help, type \"help")$/gm

	if (startCatchReg.exec(message)) {
		channel.emit('minecraft-server-status', 'started')
	}

	channel.emit('minecraft-server-log', message)
	serverLogs.push(message)
}

function startServer() {
	console.info('starting mc server')
	channel.emit('minecraft-server-status', 'starting')

	let server = spawnMCServer()

	if (server) {
		mcServer = server

		mcServer.stdout.on('data', serverLogMessage)
		mcServer.stderr.on('data', serverLogMessage)

		mcServer.on('exit', () => {
			mcServer = false
			channel.emit('minecraft-server-status', 'stopped')
		})
	} else {
		channel.emit('minecraft-server-failed-start')
	}
}

function stopServer() {
	if (!mcServer || !mcServer.pid)
		return console.info('minecraft server already stopped')

	console.info('stopping minecraft server')
	channel.emit('minecraft-server-status', 'stopping')

	mcServer.stdin.write('stop\n')
}

function restartServer() {
	console.log('restarting minecraft server')
	channel.emit('minecraft-server-status', 'stopping')

	stopServer()

	channel.emit('minecraft-server-status', 'restarting')

	if (mcServer) {
		mcServer.once('exit', () => {
			if (mcServer) mcServer.removeAllListeners()
			startServer()
		})
	}
}

function getServerStatus(socket: Socket) {
	return (...args: any[]) => {
		let status = 'stopped'

		if (mcServer && mcServer.pid) {
			status = 'started'
		}

		channel.emit('minecraft-server-status', status)
		if (typeof args[0] === 'function') args[0](status)
	}
}
