import axios from "./http.js";
import Qs from 'qs';
export function getData(url, params) {
	return axios.get(url, {
		params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	})
}
export function postData(url, params) {
	return axios.post(url, params).then(res => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	});
}
export function postDataQs(url, params) {
	return axios.post(url, Qs.stringify(params), {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).then(res => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	});
}

export function deleteData(url, params) {
	return axios.delete(url, params).then(res => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	});
}
export function putData(url, params) {
	return axios.put(url, params).then(res => {
		return Promise.resolve(res.data)
	}).catch(err => {
		return Promise.reject(err)
	});
}