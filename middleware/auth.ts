import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = async ({ req, redirect, route, store }) => {
	const user = store.getters['auth/user']

	if (!user && !route.fullPath.startsWith('/login')) {
		if (!req.session.token) {
			console.log('redirecting to login')
			redirect('/login')
		}

		await store.dispatch('auth/fetch_user', req.session.token)
	}
}

export default authMiddleware
