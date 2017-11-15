 export const routes = [
	{ path: '/', component: require('./pages/root.vue') },

	{ path: '/login', component: require('./pages/auth/login.vue'), name: 'login'},
	{ path: '/register', component: require('./pages/auth/register.vue'), name: 'register'},
	{ path: '/forgot-password', component: require('./pages/auth/forgot-password.vue'), name: 'forgot-password'},
	{ path: '/password-reset', component: require('./pages/auth/password-reset.vue'), name: 'password-reset'},

	{ path: '/*', component: require('./pages/404') }
]
