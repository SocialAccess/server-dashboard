<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import formatBytes from '@includes/formatBytes'

@Component
export default class ServerNetworkStats extends Vue {
	@Prop({ type: String, required: true }) stat!: String
	@Prop({ type: Object, required: true }) iface!: any

	formatSize(bytes: number) {
		return formatBytes(bytes)
	}
}
</script>

<template>
	<div class="interface-stat" :class="stat">
		<template v-if="stat === 'up-down'">
			<span class="stat-label">UP / DOWN</span>

			<div class="stat-data">
				<span>{{ formatSize(iface.rx_sec) }}</span>
				<span>{{ formatSize(iface.tx_sec) }}</span>
			</div>
		</template>

		<template v-else-if="stat === 'dropped'">
			<span class="stat-label">DROPPED</span>

			<div class="stat-data">
				<span>{{ formatSize(iface.rx_dropped) }}</span>
			</div>
		</template>

		<template v-else-if="stat === 'total-up'">
			<span class="stat-label">TOTAL UP</span>

			<div class="stat-data">
				<span>{{ formatSize(iface.tx_bytes) }}</span>
			</div>
		</template>

		<template v-else-if="stat === 'total-down'">
			<span class="stat-label">TOTAL DOWN</span>

			<div class="stat-data">
				<span>{{ formatSize(iface.rx_bytes) }}</span>
			</div>
		</template>

		<template v-else>
			<span class="stat-label">{{ stat }}</span>

			<div class="stat-data">
				<span>{{ iface[stat] }}</span>
			</div>
		</template>
	</div>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.interface-stat {
	@include flex(column);
	min-width: 150px;
	padding: 1em;
	border: 2px solid rgb(155, 155, 155);

	position: relative;
	margin: 0.25em;
	margin-top: 1em;

	background-color: white;

	font-weight: bold;

	border-radius: 5px;

	.stat-label {
		padding: 0.5em 0.75em;
		padding-bottom: 0px;
		border-bottom: none;

		position: absolute;
		left: 1em;
		top: -1em;

		background-color: white;

		font-size: 1em;

		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
	}

	.stat-data {
		width: 100%;
		margin-top: 0.5em;
	}
}

.interface-stat.up-down {
	.stat-data {
		@include flex(row, space-between, center);
		flex-wrap: wrap;

		span {
			width: 45%;
			white-space: nowrap;
		}
	}
}
</style>