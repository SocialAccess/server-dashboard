<script lang="ts">
import { Vue, Component, Getter, Watch } from 'nuxt-property-decorator'
import si from 'systeminformation'

@Component
export default class PageRootIndex extends Vue {}
</script>

<template>
	<page>
		<server-memory />
	</page>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';
</style>