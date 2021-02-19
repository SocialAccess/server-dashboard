<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class PageRootIndex extends Vue {}
</script>

<template>
	<page>
		<h5>Hello!</h5>
	</page>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';
</style>