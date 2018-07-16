/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import {
    Loading
} from 'element-ui';
// axios 配置
axios.defaults.timeout = 5000;
/*axios.defaults.baseURL = 'https://api.github.com';*/

// http request 拦截器

let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中',
        background: 'rgba(0, 0, 0, 0.5)'
    })
}

function endLoading() {
    loading.close()
}


let needLoadingRequestCount = 0

export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

axios.interceptors.request.use(
    config => {
        //console.log(config.showLoading)
        if (config.showLoading) {
            showFullScreenLoading()
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(

    response => {
        if (response.config.showLoading) {
            tryHideFullScreenLoading()
        }
        return response;
    },
    error => {
        tryHideFullScreenLoading()
        return Promise.reject(error.response)
    });

export default axios;