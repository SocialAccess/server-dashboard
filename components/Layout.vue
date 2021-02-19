<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Layout extends Vue {}
</script>

<template>
	<div class="layout">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.layout {
	width: 100%;
	height: 100%;

	overflow: hidden;
}
</style>