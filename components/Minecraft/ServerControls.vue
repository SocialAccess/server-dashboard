<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Socket } from 'socket.io-client'

@Component
export default class MinecraftServerControls extends Vue {
	socket!: Socket

	serverStatus: string = 'stopped'
	allDisabled = ['starting', 'stopping', 'restarting']

	mounted() {
		this.socket = this.$io('/minecraft')

		this.socket.on('minecraft-server-log', console.log)
		this.socket.on('minecraft-server-status', (status: string) => {
			console.log(status)
			this.serverStatus = status
		})

		this.socket.emit('minecraft-server-status')
	}

	start() {
		this.socket.emit('minecraft-server-start')
	}

	stop() {
		this.socket.emit('minecraft-server-stop')
	}
}
</script>

<template>
	<card class="minecraft-server-controls">
		<template v-slot:header>
			<div class="controls-header">
				<h1>Server Controls</h1>

				<div class="server-status" :class="serverStatus">
					{{ serverStatus }}
				</div>
			</div>
		</template>

		<div class="server-actions">
			<FormButton
				:disabled="
					serverStatus === 'started' || allDisabled.includes(serverStatus)
				"
				@click="() => socket.emit('minecraft-server-start')"
			>
				Start
			</FormButton>

			<FormButton
				:disabled="
					serverStatus === 'stopped' || allDisabled.includes(serverStatus)
				"
				@click="() => socket.emit('minecraft-server-restart')"
			>
				Restart
			</FormButton>

			<FormButton
				:disabled="
					serverStatus === 'stopped' || allDisabled.includes(serverStatus)
				"
				@click="() => socket.emit('minecraft-server-stop')"
			>
				Stop
			</FormButton>
		</div>
	</card>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.minecraft-server-controls {
	.controls-header {
		@include flex(row, space-between, center);

		.server-status {
			padding: 0.35em 0.5em;

			background-color: white;
			color: rgb(90, 90, 90);

			text-transform: capitalize;
			font-weight: bold;

			border-radius: $border-radius;

			&.starting {
				color: #388e3c;
			}

			&.started {
				color: #388e3c;
			}

			&.restarting {
				color: #f57c00;
			}

			&.stopping {
				color: #d32f2f;
			}

			&.stopped {
				color: #d32f2f;
			}
		}
	}
}
</style>