window._ = require('lodash');

window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

window.axios = require('axios');
import { API_SERVER_URL } from '../../../env.js';
window.axios.interceptors.request.use(function (config) {
    config.url = API_SERVER_URL + config.url;
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('_auth.token');

    return config;
}, function (error) {

    return Promise.reject(error);
});
window.axios.interceptors.response.use((response) => {
    $('.alert.loaded').addClass('show');
    $('#axios-error').html('').hide();

    return response;
}, (error) => {
    let the_error = error.response;

    $('#axios-error').addClass('alert').addClass('alert-danger').html(the_error.data.message).show();

    if (the_error.status == 401) {
    	localStorage.removeItem('_auth.token');

        window.location.reload(true);
    }

    return error;
});
