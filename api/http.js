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
let loadingInstance;
axios.interceptors.request.use(
    config => {
        loadingInstance = Loading.service({
            fullscreen: true
        })
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(

    response => {
        loadingInstance.close();
        return response;
    },
    error => {
        loadingInstance.close();

        return Promise.reject(error.response.data)
    });

export default axios;