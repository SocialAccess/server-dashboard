import { RootState } from '@store/index'
import { UserPackage } from '@typings/auth'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
	username: false,
})

export type AuthState = {
	username: string
}

export const getters: GetterTree<AuthState, RootState> = {
	user(state) {
		return state.username
	},
}

export const mutations: MutationTree<AuthState> = {
	user(state, user) {
		state.username = user
	},
}

export const actions: ActionTree<AuthState, RootState> = {}
