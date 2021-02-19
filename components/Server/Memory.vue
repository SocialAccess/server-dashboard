<script lang="ts">
import { ImmediateDeep } from '@typings/vue'
import { Vue, Component, Getter, Watch } from 'nuxt-property-decorator'
import si from 'systeminformation'

@Component
export default class ServerMemory extends Vue {
	@Getter('system/memory') systemMemory!: si.Systeminformation.MemData

	memoryUsedPercent: number = 0

	@Watch('systemMemory', ImmediateDeep)
	watchMemory() {
		const { free, total } = this.systemMemory
		if (!free || !total) this.memoryUsedPercent = 0
		else this.memoryUsedPercent = (free / total) * 100
	}
}
</script>

<template>
	<card class="server-memory">
		<template v-slot:header>
			<h2>Memory</h2>
		</template>
		<progress-bar :progress="memoryUsedPercent" />
	</card>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';
</style>