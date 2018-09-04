import {
	postData
} from 'api/api';
import axios from 'axios'
import store from '../../store'
export function login() {
	lx.getBaseInfo({
		isNeedLbs: false,
		success: function(base) {
			// base为灵犀中的基础参数，可获取token,uid,imei, clientver等信息
			//例：ver token= base.token,uid= base.uid

			if (base.token) {
				//window.alert(base.token)
				//获取用户信息；
				getLingxiUserInfo(base)

			} else {
				//跳转登录
				lx.turnToNativePage({
					page: 'LoginHomePage'
				});
			}
		}
	});

}

function getLingxiUserInfo(base) {
	let timestamp = new Date().getTime();
	const url = 'http://ydclient.voicecloud.cn/vaclient/do?c=1122&v=3.0&t=' + timestamp

	const data = {
		base
	};
	const options = {
		method: 'POST',
		headers: {
			'content-type': 'text/plain'
		},
		data: JSON.stringify(data),
		url,
	};
	axios(options).then(res => {
		if (res.data.error_code == 0) {
			let result = res.data.result.data;
			postLxSign(result)
		}
	}).catch(err => {
		window.alert(err.data)
	})
}

function postLxSign(result) {
	let nickname = !result.nickname ? '昵称' : result.nickname;
	let avatar = !result.headlogo ? 'http://st.ddpei.cn/hv/avatar/logo.jpg?x-oss-process=style/avatar120png' : result.headlogo;
	postData('/api/user/lxsign', {
		openid: result.caller,
		nickName: nickname,
		avatar
	}).then(res => {
		if (res.status === 200) {
			store.commit('SET_LOGIN', res.data)
		}
	}).catch(err => {
		window.alert(err.data.message)
	})
}