import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = async ({ req, redirect, route, store }) => {
	const user = store.getters['auth/user']

	if (!user) {
		if (req) {
			if (!req.session.username || !req.session.password) {
				console.log('redirecting to login')
				if (!route.fullPath.startsWith('/login')) redirect('/login')
			} else {
				store.commit('auth/user', req.session.username)
			}
		}
	}
}

export default authMiddleware
