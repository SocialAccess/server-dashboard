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

	border-radius: 5px;

	.card-header {
		width: 100%;
		margin-bottom: 0.5em;

		&::v-deep {
			h1,
			h2,
			h3,
			h4,
			h5 {
				padding: 0px;
			}
		}
	}
}
</style>