<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Page extends Vue {}
</script>

<template>
	<main class="page">
		<slot />
	</main>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.page {
	width: 100%;
	height: 100%;

	overflow-y: auto;
}
</style>