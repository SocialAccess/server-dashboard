import { RootState } from '@store/index'
import { UserPackage } from '@typings/auth'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
	user: false,
	token: false,
})

export type AuthState = {
	user: UserPackage
	token: string
}

export const getters: GetterTree<AuthState, RootState> = {
	user(state) {
		return state.user
	},
	token(state) {
		return state.token
	},
}

export const mutations: MutationTree<AuthState> = {
	user(state, user) {
		state.user = user
	},
	token(state, token) {
		state.token = token
	},
}

export const actions: ActionTree<AuthState, RootState> = {
	async fetch_user({ commit }, token: string) {
		try {
			if (!token) {
				console.warn('requested to fetch user but no token provided')
				return false
			}
			console.info('fetching user')
		} catch (error) {
			console.log(error)
		}
	},
}
