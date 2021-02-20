import { Systeminformation } from 'systeminformation'

export interface SystemNetwork {
	stats: Systeminformation.NetworkStatsData
	interfaces: Systeminformation.NetworkInterfacesData
	connections: Systeminformation.NetworkConnectionsData
}

export interface SystemCPU extends Systeminformation.CpuData {
	currentSpeed: Systeminformation.CpuCurrentSpeedData
	load: Systeminformation.CurrentLoadData
	temp: Systeminformation.CpuTemperatureData
}

export interface System {
	time: Systeminformation.TimeData
	os: Systeminformation.OsData
	mem: Systeminformation.MemData
	network: SystemNetwork
	cpu: SystemCPU
}
