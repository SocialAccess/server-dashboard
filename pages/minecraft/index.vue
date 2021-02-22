<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class PageMinecraftIndex extends Vue {}
</script>

<template>
	<page class="page-minecraft layout-column columns-2">
		<div class="layout-row">
			<minecraft-server-download />

			<minecraft-server-controls />
		</div>

		<div class="layout-row">
			<minecraft-server-console />
		</div>
	</page>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.page-minecraft {
	grid-template-columns: 30% auto;
	padding: 1em;
}
</style>