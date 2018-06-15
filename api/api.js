import axios from 'axios'
export function Post(url, params) {
	return axios.post(url, params).then(res => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}