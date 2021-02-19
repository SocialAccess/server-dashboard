import { Plugin } from '@nuxt/types'
import { io } from 'socket.io-client'

declare module 'vue/types/vue' {
	interface Vue {
		$io: typeof io
	}
}

const IOPlugin: Plugin = async (context, inject) => {
	inject('io', io)
}

export default IOPlugin
