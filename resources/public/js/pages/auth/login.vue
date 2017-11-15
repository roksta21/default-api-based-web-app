<template>
	<div>
		login
	</div>
</template>

<script>
	import { PASSWORD_GRANT_CLIENT_ID } from '../../../../../env.js';
	import { PASSWORD_GRANT_CLIENT_SECRET } from '../../../../../env.js';

	export default {
		beforeCreate() {
			if (this.$auth.isAuthenticated()) {
		        window.location.href = '/dashboard';
		    }
		},

		data() {
			return {
				credentials: { email: '', password: '' }
			}
		},

		methods: {
			login() {
				let form_data = {
					grant_type: 'password',
					client_id: PASSWORD_GRANT_CLIENT_ID,
					client_secret: PASSWORD_GRANT_CLIENT_SECRET,
					username: this.credentials.email,
					password: this.credentials.password
				};

				axios.post('/oauth/token', form_data).then(response => {
					this.$auth.setToken(response.data.access_token);
					window.location.href = '/dashboard';
				});
			}
		}
	}
</script>