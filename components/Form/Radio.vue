<script lang="ts">
import { Component, Prop, Emit, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class FormRadio extends Vue {
	@Prop({ type: String, required: true }) name!: string
	@Prop({ type: String, default: '' }) label!: string
	@Prop({ type: Object, required: true }) options!: { [label: string]: string }
	@Prop({ type: String }) selected!: string

	@Prop({ type: String, default: '' }) design!: string

	value: string = ''

	mounted() {
		if (this.selected) {
			this.value = this.selected
		}
	}

	get optionsArray() {
		return Object.entries(this.options)
	}

	@Emit('input')
	emitInput() {
		return this.value
	}

	@Watch('value')
	inputChanged() {
		this.emitInput()
	}
}
</script>

<template>
	<div class="input-radio-buttons" :class="[design]">
		<label v-if="label && label.length" class="input-radio-label" :for="name">
			{{ label }}
		</label>

		<div class="input-radio-wrap">
			<template v-for="[label, v] of optionsArray">
				<div
					:key="label"
					class="input-radio"
					:class="{ selected: v === value }"
					@click="value = v"
				>
					<input type="radio" :value="v" :name="name" />
					<div class="radio-mark" />
					<label :for="name">{{ label }}</label>
				</div>
			</template>
		</div>
	</div>
</template>
