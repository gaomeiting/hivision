import * as types from "./mutation-types";

const mutations = {
	[types.SET_LOGIN](state, data) {
		sessionStorage.token = data;
		state.token = data;
	},
	[types.SET_LOGOUT](state) {
		sessionStorage.removeItem('token');
		state.token = null
	}
}
export default mutations