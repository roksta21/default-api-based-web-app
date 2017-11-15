// Vue js
window.Vue = require('vue');

// progress-bar
import VueProgressBar from 'vue-progressbar';
const options = {
    color: '#F44336',
    failedColor: '#874b4b',
    thickness: '3px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
};
Vue.use(VueProgressBar, options);

// Vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const { routes } = require('./routes');

window.router = new VueRouter({
    mode: 'history',
    routes
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

// Axios interceptors
window.axios.interceptors.request.use(function (config) {
    app.$Progress.start();

    return config;
}, function (error) {
    app.$Progress.fail();

    return Promise.reject(error);
});

window.axios.interceptors.response.use((response) => {
    app.$Progress.finish();

    return response;
}, (error) => {
    app.$Progress.fail();

    return error;
});