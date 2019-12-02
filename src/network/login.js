import {request} from "./request";
import Qs from 'qs';
export function getLogin(phone,password) {
  let datas = {
    'username':phone,
    'userpass':password,
  }
  let headCode = {
    url: 'user/index/login.html',
    method: 'post',
    data: Qs.stringify(datas)
  }
  return request(headCode)
}
export function getLogout() {
  let headCode = {
    url: 'user/index/logout.html',
    method: 'post',
  }
  return request(headCode)
}

