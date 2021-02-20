<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class ServerNetwork extends Vue {}
</script>

<template>
	<card>
		<template v-slot:header>
			<h1>Network</h1>
		</template>

		<network-stats />
	</card>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';
</style>