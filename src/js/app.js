// Import environment variables important for our config.
require('./env');

// jquery
window.$ = window.jQuery = require('jquery');

// set up axios and its interceptors
window.axios = require('axios');

// intercept all outgoing requests to our api server url and attach the token if present.
window.axios.interceptors.request.use(function (config) {
    config.url = API_SERVER_URL + config.url;
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_PREFIX + 'token');

    return config;
}, function (error) {

    return Promise.reject(error);
});

// Toastr
// window.toastr = require('toastr');

// set up vue
window.Vue = require('vue');

// Progress Bar
import VueProgressBar from 'vue-progressbar';
const options = {
    color: '#404040',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: false,
    location: 'top',
    inverse: false
};
Vue.use(VueProgressBar, options);

//use Vue Router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// import and initialize our routes
const { routes } = require('./routes');

window.router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
	
	next();
});

// My auth module
import { Auth } from './modules/auth/auth';
Vue.use(Auth);

// vuex
import { store } from './store/store';

// Components
require('./components');

// start vue instance
const app = new Vue({
    router,
    store
}).$mount('#app');

// Progress Bar and error handling
window.axios.interceptors.request.use(function(config) {
    app.$Progress.start();

    return config;
}, function(err) {
    app.$Progress.fail();

    return Promise.reject(err);
});

window.axios.interceptors.response.use(function (response) {
    app.$Progress.finish();

    if (response.data.success) {
        toastr.success(response.data.message, 'Success');
    }

    return response;
}, function (error) {
    app.$Progress.fail();

    return Promise.reject(error);
});