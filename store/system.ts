import { RootState } from '@store/index'
import { Socket } from 'socket.io-client'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Systeminformation } from 'systeminformation'

export const state = () => ({
	time: {
		current: false,
		timezone: false,
		timezoneName: false,
		uptime: false,
	},
	os: false,
	mem: false,
	networkStats: false,
	cpu: false,
	cpuCurrentSpeed: false,
	currentLoad: false,
	temp: false,
})

export type SystemState = {
	[key: string]: any
	time: Systeminformation.TimeData
	os: Systeminformation.OsData
	mem: Systeminformation.MemData
	networkStats: Systeminformation.NetworkStatsData
	net: Systeminformation.NetworkInterfacesData
	networkConnections: Systeminformation.NetworkConnectionsData
	cpu: Systeminformation.CpuData
	cpuCurrentSpeed: Systeminformation.CpuCurrentSpeedData
	currentLoad: Systeminformation.CurrentLoadData
	temp: Systeminformation.CpuTemperatureData
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
	network(state) {
		return {
			interfaces: state.net,
			stats: state.networkStats,
			connections: state.networkConnections,
		}
	},
	cpu(state) {
		if (!state.cpu) return false
		return {
			...state.cpu,
			currentSpeed: state.cpuCurrentSpeed,
			load: state.currentLoad,
			temp: state.temp,
		}
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
			setTimeout(dispatchDynamic, 100)
		}

		await dispatchStatic()
		dispatchDynamic()
	},
}
