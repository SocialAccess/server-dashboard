import { RootState } from '@store/index'
import { Socket } from 'socket.io-client'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import si from 'systeminformation'

export const state = () => ({
	time: {
		current: false,
		timezone: false,
		timezoneName: false,
		uptime: false,
	},
	os: false,
	mem: false,
})

export type SystemState = {
	time: si.Systeminformation.TimeData
	os: si.Systeminformation.OsData
	mem: si.Systeminformation.MemData
	[key: string]: any
}

export const getters: GetterTree<SystemState, RootState> = {
	all(state) {
		return state
	},
	time(state) {
		return state.time
	},
	os(state) {
		return state.os
	},
	memory(state) {
		return state.mem
	},
}

export const mutations: MutationTree<SystemState> = {
	set(state, data) {
		Object.keys(data).forEach((key) => {
			state[key] = data[key]
		})
	},
}

export const actions: ActionTree<SystemState, RootState> = {
	static({ commit }, socket: Socket) {
		return new Promise((resolve) => {
			if (!socket) return false
			socket.emit('static-data', (data: any) => {
				commit('set', data)
				resolve(data)
			})
		})
	},
	dynamic({ commit }, socket: Socket) {
		return new Promise((resolve) => {
			if (!socket) return false
			socket.emit('dynamic-data', (data: any) => {
				commit('set', data)
				resolve(data)
			})
		})
	},
	async start_fetch_loop({ dispatch }, socket: Socket) {
		if (!socket) {
			console.warn('can not start system fetch loop, not socket provided')
			return false
		}
		console.info('starting system fetch loop')

		const dispatchStatic = async () => {
			await dispatch('static', socket)
			setTimeout(dispatchStatic, 30000)
		}

		const dispatchDynamic = async () => {
			await dispatch('dynamic', socket)
			setTimeout(dispatchDynamic, 1000)
		}

		await dispatchStatic()
		dispatchDynamic()
	},
}
