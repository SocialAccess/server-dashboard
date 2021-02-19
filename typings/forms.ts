import Vue from 'vue'

export const InputVNode = Vue.extend({
	props: {
		name: { type: String, required: true },
		label: { type: String },
		defaultValue: { type: String, default: '' },
		design: { type: String, default: '' },
	},
})
