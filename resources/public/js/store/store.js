import Vue from 'vue';
import Vuex from 'vuex';
import users_store from './modules/users';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		users_store
	}
});