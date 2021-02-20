<script lang="ts">
import { Vue, Component, Getter, Watch } from 'nuxt-property-decorator'
@Component
export default class PageRootIndex extends Vue {}
</script>

<template>
	<page class="page-dashboard layout-column columns-2">
		<div class="layout-row">
			<server-memory />

			<server-cpu />
		</div>

		<div class="layout-row">
			<server-network />
		</div>
	</page>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.page-dashboard {
	padding: 2em;
}
</style>