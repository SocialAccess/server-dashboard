import alias from './config/alias'
import components from './config/components'
import axios from './modules/axios'

import session from './modules/session'

import serverMiddleware from './server/middleware'

process.env.dirname = __dirname

const appMeta = {
	title: 'Server Dashboard',
	description: '',
}

export default {
	alias,
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: appMeta.title,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: appMeta.description },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// server: {
	// 	host: '192.168.1.26',
	// },

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['@assets/styles/app.scss'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components,
	serverMiddleware,
	router: {
		middleware: ['auth'],
	},

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		session,
		// https://go.nuxtjs.dev/axios
		axios,
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		'@modules/io',
	],

	watch: ['~/server/**'],

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		meta: {
			name: appMeta.title,
			description: appMeta.description,
			theme_color: '#ffffff',
		},
		manifest: {
			name: appMeta.title,
			short_name: appMeta.title,
			description: appMeta.description,
			lang: 'en',
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
}
