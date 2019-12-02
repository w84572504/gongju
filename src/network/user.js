import {request} from "./request";
import Qs from 'qs';

export function getInfo() {
  let headCode = {
    url: 'user/equipment/init.html',
    method: 'post',
  }
  return request(headCode)
}
export function getList(datas) {
  let headCode = {
    url: 'user/equipment/lists.html',
    method: 'post',
    data: Qs.stringify(datas)
  }
  return request(headCode)
}
export function getEqu(datas) {
  let headCode = {
    url: 'user/equipment/getequ.html',
    method: 'post',
    data: Qs.stringify(datas)
  }
  return request(headCode)

}
export function ruKu(datas) {
  let headCode = {
    url: 'user/equipment/ruku.html',
    method: 'post',
    data: Qs.stringify(datas)
  }
  return request(headCode)
}
export function getBadInfo() {
  let headCode = {
    url: 'user/equipment/bfclass.html',
    method: 'post',
  }
  return request(headCode)
}
export function baoFei(datas) {
  let headCode = {
    url: 'user/equipment/baofei.html',
    method: 'post',
    data: Qs.stringify(datas)
  }
  return request(headCode)
}
export function shiYan(datas) {
  let headCode = {
    url: 'user/equipment/shiyan.html',
    method: 'post',
    data: Qs.stringify(datas)
  }
  return request(headCode)
}
export function getTestInfo() {
  let headCode = {
    url: 'user/equipment/syclass.html',
    method: 'post',
  }
  return request(headCode)
}
export function editpass(datas) {
  let headCode = {
    url: 'user/equipment/userpass.html',
    method: 'post',
    data: Qs.stringify(datas)
  }
  return request(headCode)
}
export function getType() {
  let headCode = {
    url: 'user/equipment/seclass.html',
    method: 'post',
  }
  return request(headCode)
}

