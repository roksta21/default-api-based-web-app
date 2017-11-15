import Vue from 'vue';

export function Auth(options = {}) {
	Vue.auth = {

	    storagePrefix: options.storagePrefix || '_auth.',
	    redirectType: options.redirectType || 'router',
	    authPath: options.authPath || '/login',
	    userData: undefined,

	    getStorageKey(part) {

	        return this.storagePrefix + part;
	    },

	    setToken(token) {

	        return localStorage.setItem(this.getStorageKey('token'), token);
	    },

	    getToken() {

	    	return localStorage.getItem(this.getStorageKey('token'));
	    },

	    removeToken() {

	        return localStorage.removeItem(this.getStorageKey('token'));
	    },

	    isAuthenticated() {

	        return this.getToken() != null;
	    }
	};

	Object.defineProperties(Vue.prototype, {
	    $auth: {
	        get() {
	            return Vue.auth;
	        }
	    }

	});
}