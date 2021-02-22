<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Socket } from 'socket.io-client'

@Component
export default class MinecraftServerDownload extends Vue {
	socket!: Socket
	defaultServerURL: string =
		'https://papermc.io/api/v1/paper/1.16.3/latest/download'

	downloadStarted: boolean = false
	downloadProgress: number = 0

	mounted() {
		this.socket = this.$io('/minecraft')

		this.socket.on(
			'download-server-started',
			() => (this.downloadStarted = true)
		)
		this.socket.on('download-server-progress', (percent: number) => {
			this.downloadProgress = percent
		})
	}

	download() {
		this.socket.emit('download-server', this.defaultServerURL)
	}
}
</script>

<template>
	<card class="minecraft-server-download-card">
		<h3>Server Download</h3>
		<progress-bar :progress="downloadProgress" />

		<FormButton @click="download">Start Download</FormButton>
	</card>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';
</style>