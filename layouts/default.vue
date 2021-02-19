<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class LayoutDefault extends Vue {}
</script>

<template>
	<layout class="layout-default">
		<header class="layout-header">
			<h5>HEADER</h5>
		</header>

		<div class="layout-body">
			<Nuxt />
		</div>
	</layout>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';
</style>