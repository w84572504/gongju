import axios from 'axios'
import store from 'store/index'

import { Toast } from 'vant';
export function request(config) {
  const instace = axios.create({
    baseURL : 'http://gqj.tuxiaomi.com/',
    timeout : 5000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
  instace.interceptors.request.use(config => { //请求拦截
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    });
    // store.commit('showLoading');
    let str = {};
    if (config.method === 'get' && config.params !== undefined){
      str =config.params
    }
    // config.headers.token = Sign.Sign(config.url,str,store.state.Us)
    if (store.state.sign) {
      config.headers.sign = store.state.sign
    }
    return config
    },err => {
    // store.commit('hideLoading')
    Toast.clear()
    return Promise.reject(err)
    })

  instace.interceptors.response.use(res => { //响应拦截
    // store.commit('hideLoading')
    Toast.clear()
    if (res.data.status == -2){
      store.commit('logout')
    }
    return res.data
    }, err =>{
    // store.commit('hideLoading')
    Toast.clear()
    console.log(err)
  })
  return instace(config)
}
