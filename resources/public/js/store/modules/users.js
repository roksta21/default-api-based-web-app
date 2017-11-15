const state = {
	auth_user: {}
};

const mutations = {
	setAuthUser(state, data) {
		state.auth_user = data;
	}
};

const getters = {
	getAuthUser(state) {
		return state.auth_user;
	}
};

const actions = {
	
};

export default {
	state,
	mutations,
	getters,
	actions
}