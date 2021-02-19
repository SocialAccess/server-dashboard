<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import { Socket } from 'socket.io-client'
import si from 'systeminformation'

@Component
export default class LayoutDefault extends Vue {
	@Getter('auth/user') username!: string
	@Getter('system/os') systemOS!: si.Systeminformation.OsData
	socket!: Socket

	mounted() {
		if (this.username && !this.socket) {
			this.socket = this.$io()
			this.$store.dispatch('system/start_fetch_loop', this.socket)
		}
	}
}
</script>

<template>
	<layout class="layout-default">
		<template v-if="systemOS">
			<header class="layout-header">
				<NavigationMain />
			</header>

			<div class="layout-body">
				<Nuxt />
			</div>
		</template>

		<template v-else>
			<div class="waiting-for-data">
				<h2>Waiting for server data...</h2>
			</div>
		</template>
	</layout>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.layout-default {
	@include flex(column);

	.layout-header,
	.layout-body {
		width: 100%;
	}

	.layout-body {
		flex: 1;

		overflow: hidden;
	}

	.waiting-for-data {
		@include flex(column, center, center);
		width: 100%;
		height: 100%;
	}
}
</style>