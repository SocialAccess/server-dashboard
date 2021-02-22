<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import si from 'systeminformation'

@Component
export default class NavigationMain extends Vue {
	@Getter('auth/user') username!: string
	@Getter('system/os') systemOS!: si.Systeminformation.OsData

	menu: { [url: string]: string } = {
		'/': 'Home',
		'/minecraft': 'Minecraft',
		// '/files': 'Files',
	}

	get menuEntries() {
		return Object.entries(this.menu)
	}

	get distroImage() {
		return `/images/${this.systemOS.logofile}.png`
	}
}
</script>

<template>
	<nav class="navigation-main">
		<div class="server-info">
			<img :src="distroImage" :alt="systemOS.distro" class="server-distro" />

			<h3 class="server-name">
				{{ systemOS.hostname }}
			</h3>
		</div>

		<div class="navigation-menu">
			<nuxt-link
				v-for="(menuItem, i) in menuEntries"
				:key="i"
				:to="menuItem[0]"
				class="menu-item"
			>
				{{ menuItem[1] }}
			</nuxt-link>
		</div>

		<div class="user-account">
			<h3 class="username">{{ username }}</h3>
		</div>
	</nav>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.navigation-main {
	@include flex(row, space-between, center);
	width: 100%;
	height: 60px;
	padding: 0px 1em;

	background-color: white;

	.server-info {
		@include flex(row, flex-start, center);
		margin-right: 0.5em;

		.server-distro {
			height: 35px;
			margin-right: 0.5em;
		}

		.server-name {
			padding: 0px;
		}
	}

	.navigation-menu {
		@include flex(row, flex-start, center);
		flex: 1;

		.menu-item {
			padding: 0.5em 1em;
			background-color: transparent;
			color: black;
			text-decoration: none;

			border-radius: $border-radius;
			transition: background-color 0.25s, color 0.25s;

			&:hover {
				background-color: $color-primary;
				color: $color-primary-text;
			}
		}
	}

	.user-account {
		@include flex(row, flex-end, center);

		.username {
			padding: 0px;
		}
	}
}
</style>
