<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'

@Component({
	layout: 'no-layout',
})
export default class PageRootLogin extends Vue {
	@Getter('auth/user') username!: string

	async mounted() {
		if (this.$route.query?.logout) {
			await this.logout()
		}
	}

	async login(data: FormData) {
		const creds = {
			username: data.get('username'),
			password: data.get('password'),
		}

		try {
			const res = await this.$axios.post('auth', creds)

			if (res.data === true) {
				this.$store.commit('auth/user', creds.username)
				this.$router.push('/')
			} else {
				console.error('invalid username or password!')
			}
		} catch (e) {
			console.error(e)
		}
	}

	async logout() {
		try {
			await this.$axios.delete('auth')
			this.$store.commit('auth/user', false)
			this.$router.push('/login?logged_out=true')
		} catch (e) {
			console.error(e)
		}
	}
}
</script>

<template>
	<page class="page-login">
		<FormComponent v-if="!username" class="form-login" @submit="login">
			<FormInput name="username" label="Username" />
			<FormInput name="password" label="Password" />

			<FormButton class="form-submit">
				<span>Login</span>
			</FormButton>
		</FormComponent>

		<div v-else class="logged-in">
			<h3>You are already logged in.</h3>
			<FormButton @click="logout">Log out?</FormButton>
		</div>
	</page>
</template>

<style lang="scss" scoped>
@import '@assets/styles/sassy';

.page-login {
	@include flex(column, center, center);

	.form-login {
		width: 500px;

		.form-submit {
			justify-self: end;
		}
	}

	.logged-in {
		@include flex(column, center, center);
	}
}
</style>