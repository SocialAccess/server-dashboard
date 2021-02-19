import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({})

export type RootState = {}

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {
	async nuxtServerInit(ctx, { req }) {
		if (req.session.token) {
			await ctx.dispatch('auth/fetch_user', req.session.token)
		}
	},
}
