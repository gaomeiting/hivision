import axios from 'axios'
export function PostData (url, params) {
	return axios.post(url, params).then(res => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}

export function GetData (url, params) {
	return axios.get(url, {
		params
	}).then(res => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}