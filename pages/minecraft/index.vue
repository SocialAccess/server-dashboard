<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class PageMinecraftIndex extends Vue {}
</script>

<template>
	<page>
		<h3>Minecraft</h3>

		<minecraft-server-controls />
	</page>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';
</style>