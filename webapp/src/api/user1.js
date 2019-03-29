import http from './index'
const baseUrl = '/api'
// 登陆
export const login = (params) => {
  return http.fetchPost(`${baseUrl}/users/login`, params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchPost(`${baseUrl}/users/loginOut`, params)
}
// 用户信息
export const getuserInfo = (params) => {
  return http.fetchPost(`${baseUrl}/users/userInfo`, params)
}
// 注册账号
export const regist = (params) => {
  return http.fetchPost(`${baseUrl}/users/register`, params)
}
// 获取购物车数据
export const cartList = () => {
  return http.fetchPost(`${baseUrl}/users/cartList`)
}


