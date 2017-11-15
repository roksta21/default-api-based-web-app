<template>
	<div>
		password-reset
	</div>
</template>

<script>
	export default {
		beforeCreate() {
			if (this.$auth.isAuthenticated()) {
		        window.location.href = '/dashboard';
		    }
		}
	}
</script>