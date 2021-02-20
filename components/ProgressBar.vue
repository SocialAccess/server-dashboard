<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class ProgressBar extends Vue {
	@Prop({ type: Number, default: 0 }) progress!: number

	get percent() {
		return Math.round((this.progress + Number.EPSILON) * 100) / 100
	}

	styles() {
		return {
			'--progress-bar-percent': `${this.percent}%`,
		}
	}
}
</script>

<template>
	<div class="progress-bar" :style="styles()">
		<span class="percent">
			{{ `${this.percent}%` }}
		</span>
	</div>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.progress-bar {
	@include flex(row, flex-end, center);
	width: 100%;
	height: 40px;

	position: relative;

	background-color: lightgray;

	overflow: hidden;
	border-radius: $border-radius;

	&::before {
		content: ' ';
		@include flex;
		width: var(--progress-bar-percent, '0%');
		height: 100%;

		position: absolute;
		left: 0px;
		top: 0px;
		z-index: 0;

		background-color: $color-primary-var;
	}

	.percent {
		padding: 0.25em;

		margin-right: 1em;
		z-index: 1;

		background-color: lightgray;
		font-weight: bold;

		border-radius: $border-radius;
	}
}
</style>