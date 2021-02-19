<script lang="ts">
import { Component, Prop, Watch, Emit } from 'nuxt-property-decorator'
import { InputVNode } from '@typings/forms'

@Component
export default class FormInput extends InputVNode {
	@Prop({ type: String, required: true }) name!: string
	@Prop({ type: String, default: 'text' }) type!: string
	@Prop({ type: Boolean }) clearable!: boolean
	@Prop({ type: String, default: '' }) placeholder!: string
	@Prop({ type: String }) defaultValue!: string
	@Prop({ type: Boolean }) required!: boolean

	value: string = ''

	mounted() {
		if (this.defaultValue && typeof this.defaultValue === 'string') {
			this.value = this.defaultValue
		}
	}

	get hasValue() {
		return this.value.length
	}

	get inputAttrs() {
		return {
			name: this.name,
			type: this.type,
		}
	}

	@Emit('input')
	emitInput() {
		return this.value
	}

	@Watch('defaultValue')
	setValue() {
		this.value = this.defaultValue
	}

	@Watch('value')
	inputChanged() {
		this.emitInput()
	}

	clearInput() {
		this.value = ''
	}
}
</script>

<template>
	<div
		class="form-input"
		:class="[hasValue ? 'has-value' : false, design, type]"
	>
		<label :for="name" class="input-label">
			<span class="input-label-text">{{ label || name }}</span>
			<span v-if="required" class="input-required-mark">*</span>
		</label>

		<span v-if="clearable && hasValue" class="input-clear" @click="clearInput">
			<i class="far fa-times-circle" />
		</span>

		<div
			class="input-area"
			:style="type === 'color' && value ? `--selected-color: ${value};` : ''"
		>
			<span v-if="type === 'color'" class="color-select-text">
				Select Color
			</span>
			<input
				v-model="value"
				:name="name"
				:placeholder="placeholder"
				:type="type"
				:required="required"
			/>
		</div>
	</div>
</template>