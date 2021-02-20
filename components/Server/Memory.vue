<script lang="ts">
import { ImmediateDeep } from '@typings/vue'
import { Vue, Component, Getter, Watch } from 'nuxt-property-decorator'
import si from 'systeminformation'
import formatBytes from '@includes/formatBytes'

@Component
export default class ServerMemory extends Vue {
	@Getter('system/memory') systemMemory!: si.Systeminformation.MemData

	memoryUsedPercent: number = 0

	@Watch('systemMemory', ImmediateDeep)
	watchMemory() {
		const { active, total } = this.systemMemory
		if (!active || !total) this.memoryUsedPercent = 0
		else this.memoryUsedPercent = (active / total) * 100
	}

	formatSize(bytes: number) {
		return formatBytes(bytes)
	}
}
</script>

<template>
	<card class="server-memory">
		<template v-slot:header>
			<div class="server-memory-header">
				<h1>Memory</h1>

				<div class="server-memory-stats layout-column columns-3">
					<div class="stat">
						<span class="stat-label">Free</span>
						<div class="stat-data">
							{{ formatSize(systemMemory.available) }}
						</div>
					</div>

					<div class="stat">
						<span class="stat-label">Used</span>
						<div class="stat-data">
							{{ formatSize(systemMemory.active) }}
						</div>
					</div>

					<div class="stat">
						<span class="stat-label">Total</span>
						<div class="stat-data">
							{{ formatSize(systemMemory.total) }}
						</div>
					</div>
				</div>
			</div>
		</template>

		<progress-bar :progress="memoryUsedPercent" />
	</card>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.server-memory {
	.server-memory-header {
		@include flex(row, space-between, center);
		width: 100%;
	}

	.server-memory-stats {
		width: 50%;

		font-weight: bold;

		.stat {
			white-space: nowrap;
		}
	}
}
</style>