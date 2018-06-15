import * as types from "./mutation-types";

const mutations = {
	[types.SET_LOGIN](state, data) {
		localStorage.token = data.token;
		localStorage.expiresIn = data.expiresIn;
		state.token=data;
	},
    [types.SET_LOGOUT](state) {
        localStorage.removeItem('token');
        state.token = null
    }
}
export default mutations