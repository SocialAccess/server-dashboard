<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Card extends Vue {}
</script>

<template>
	<div class="card">
		<div v-if="$slots.header" class="card-header">
			<slot name="header" />
		</div>

		<slot />
	</div>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.card {
	padding: 1em;

	background-color: white;
}
</style>