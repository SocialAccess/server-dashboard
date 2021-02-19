<script lang="ts">
import { Component, Prop, Model, Vue, Watch } from 'nuxt-property-decorator'
import { Emit, VModel } from 'vue-property-decorator'

@Component
export default class FormSwitch extends Vue {
	@Prop({ type: String, required: true }) name!: string
	@Prop({ type: String, default: '' }) design!: string

	checked: boolean = false

	@Emit('input')
	emitInput() {
		return this.checked
	}

	@Watch('checked')
	inputChanged() {
		this.emitInput()
	}
}
</script>

<template>
	<div :for="name" :class="`input-switch ${design}`">
		<input
			class="input-switch-checkbox"
			type="checkbox"
			:name="name"
			:checked="checked"
			v-model="checked"
		/>
		<div class="input-switch-graphic" />
	</div>
</template>