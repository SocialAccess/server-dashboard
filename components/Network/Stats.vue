<script lang="ts">
import { SystemNetwork } from '@typings/system'
import { ImmediateDeep } from '@typings/vue'
import { Vue, Component, Getter, Watch } from 'nuxt-property-decorator'
import formatBytes from '@includes/formatBytes'

@Component
export default class ServerNetworkStats extends Vue {
	@Getter('system/network') network!: SystemNetwork

	formatSize(bytes: number) {
		return formatBytes(bytes)
	}
}
</script>

<template>
	<div class="network-interfaces">
		<template v-for="(stat, i) in network.stats">
			<div :key="i" class="network-interface">
				<div class="interface-header">
					<h2 class="interface-name">
						{{ stat.iface }}
					</h2>

					<span class="interface-state" :class="stat.operstate">
						{{ stat.operstate }}
					</span>
				</div>

				<div class="interface-stats">
					<network-stat stat="up-down" :iface="stat" />

					<network-stat stat="total-up" :iface="stat" />

					<network-stat stat="total-down" :iface="stat" />

					<network-stat stat="dropped" :iface="stat" />
				</div>
			</div>
		</template>
	</div>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.network-interfaces {
	@include flex(column);
	width: 100%;
	padding: 1em;

	.network-interface {
		@include flex(row, flex-start, center);
		width: 100%;
		flex-wrap: wrap;

		.interface-header {
			@include flex(row, flex-start, center);
			min-width: 75px;

			margin-right: 1em;

			.interface-name {
				margin-right: 0.5em;
			}

			.interface-state {
				padding: 0.25em 0.5em;
				border-radius: $border-radius;
				font-weight: bold;

				&.up {
					background-color: lightgreen;
					color: rgb(20, 156, 20);
				}
			}
		}

		.interface-stats {
			@include flex(row);
			flex-wrap: wrap;
			flex: 1;

			.interface-stat {
				flex: 1;
			}
		}
	}
}
</style>