<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Socket } from 'socket.io-client'

@Component
export default class PageFiles extends Vue {
	socket!: Socket

	mounted() {
		this.socket = this.$io('/files')

		this.socket.emit('list', '/')
	}
}
</script>

<template>
	<page>
		<h3>Files</h3>
	</page>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';
</style>