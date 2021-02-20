<script lang="ts">
import { SystemCPU } from '@typings/system'
import { ImmediateDeep } from '@typings/vue'
import { Vue, Component, Getter, Watch } from 'nuxt-property-decorator'

@Component
export default class ServerCPU extends Vue {
	@Getter('system/cpu') cpu!: SystemCPU

	get cpuUtilization() {
		if (!this.cpu) return 0
		return this.cpu.load.currentLoad
	}
}
</script>

<template>
	<card class="server-cpu">
		<template v-slot:header>
			<div class="server-cpu-details">
				<h1>CPU</h1>

				<h3 class="cpu-details-wrap">
					{{ cpu.manufacturer }}

					{{ cpu.brand }}
					-
					{{ cpu.cores }} Cores
				</h3>
			</div>
		</template>

		<progress-bar :progress="cpuUtilization" />
	</card>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.server-cpu {
	.server-cpu-details {
		@include flex(row, space-between, center);
	}
}
</style>