import * as types from "./mutation-types";

const mutations = {
	[types.SET_LOGIN](state, data) {
		localStorage.token = data;
		state.token = data;
	},
	[types.SET_LOGOUT](state) {
		localStorage.removeItem('token');
		state.token = null
	},
	[types.SET_CITY](state, city) {
		state.city = city
	},
	[types.SET_WXUSER](state, obj) {
		state.wxuser = obj
	}
}
export default mutations