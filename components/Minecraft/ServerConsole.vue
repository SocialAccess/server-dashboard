<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator'
import { Socket } from 'socket.io-client'

@Component
export default class MinecraftServerConsole extends Vue {
	@Ref('command_input') input!: Element
	@Ref('console_body') consoleBody!: HTMLDivElement

	socket!: Socket

	inputCommand: string = ''
	logs: string[] = []

	mounted() {
		this.socket = this.$io('/minecraft')
		this.socket.on('minecraft-server-log', (message: string) => {
			this.logs.push(message)

			this.$nextTick().then(() => {
				this.consoleBody.scrollTop = this.consoleBody.scrollHeight
			})
		})

		this.socket.on('minecraft-server-status', (status: string) => {
			if (status === 'stopped') this.logs = []
		})
	}

	setCommandInput(command: string) {
		this.inputCommand = command
	}

	sendCommand(data: FormData) {
		let command: string = this.inputCommand
		this.inputCommand = ''

		this.socket.emit('minecraft-server-send-command', command)
	}
}
</script>

<template>
	<card class="minecraft-server-console">
		<template v-slot:header>
			<h1>Console</h1>
		</template>

		<div ref="console_body" class="console-body">
			<span v-for="(log, i) in logs" :key="i" class="console-message">
				{{ log }}
			</span>
		</div>

		<form-component class="console-input" @submit="sendCommand">
			<form-input
				ref="command_input"
				name="command"
				label=" "
				placeholder="command..."
				:defaultValue="inputCommand"
				class="expanded flat"
				@input="setCommandInput"
			/>
		</form-component>
	</card>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.minecraft-server-console {
	overflow: hidden;

	.console-body {
		@include flex(column);
		width: 100%;
		height: 300px;

		background-color: #f5f5f5;
		color: black;

		overflow: auto;
		border-radius: $border-radius;

		.console-message {
			white-space: pre-line;
		}
	}

	.console-input {
		@include flex(row, space-between, flex-end);
		width: 100%;

		.form-input {
			flex: 1;
			padding-left: 0px;
			padding-right: 0px;
			padding-bottom: 0px;
		}
	}
}
</style>