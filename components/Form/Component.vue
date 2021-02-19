<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'

@Component
export default class FormComponent extends Vue {
	@Prop({ type: Array, default: () => [] }) fields!: any[]

	@Emit('submit')
	submit(event: Event) {
		const form = event.target as HTMLFormElement
		return new FormData(form)
	}
}
</script>

<template>
	<form class="form layout-row" @submit.prevent="submit">
		<slot />
	</form>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.input-box {
	width: 100%;

	label,
	input {
		width: 100%;
	}

	input {
		padding: 0.25em;
	}
}
</style>