<script lang="ts">
import {
	Component,
	Prop,
	Model,
	Vue,
	Watch,
	Emit,
} from 'nuxt-property-decorator'

@Component
export default class FormTextArea extends Vue {
	@Prop({ type: String, required: true }) name!: string
	@Prop({ type: String }) label!: string
	@Prop({ type: String, default: '' }) value!: string
	@Prop({ type: String, default: '' }) placeholder!: string
	@Prop({ type: Boolean }) required!: boolean

	@Prop({ type: String, default: '' }) design!: string

	input: string = ''

	mounted() {
		if (this.value && typeof this.value === 'string') {
			this.input = this.value
		}
	}

	get hasValue() {
		return this.input.length
	}

	@Emit('input')
	emitInput() {
		return this.input
	}

	@Emit('submit')
	emitSubmit() {
		return this.input
	}

	@Watch('value')
	resetValue() {
		this.input = this.value
		this.emitInput()
	}

	@Watch('input')
	inputChanged() {
		this.emitInput()
	}

	clearInput() {
		this.input = ''
	}
}
</script>

<template>
	<div class="textarea" :class="[hasValue ? 'has-value' : false, design]">
		<label v-if="label" :for="name" class="input-label">
			<span class="input-label-text">{{ label }}</span>
			<span v-if="required" class="input-required-mark">*</span>
		</label>

		<div class="input-area">
			<textarea
				v-model="input"
				:placeholder="placeholder"
				:required="required"
				@keydown.shift.enter.prevent="emitSubmit"
			/>
		</div>
	</div>
</template>