import http from './index'
const baseUrl = '/api'
// 手机列表
export const getphonelist = () => {
  return http.fetchGet(`${baseUrl}/goods/phonelists`)
}
// 耳机列表
export const getheadsetlist = () => {
  return http.fetchGet(`${baseUrl}/goods/headsetlists`)
}
// 配件列表
export const getpartlist = () => {
  return http.fetchGet(`${baseUrl}/goods/partlists`)
}
// 生活周边列表
export const getarroundlist = () => {
  return http.fetchGet(`${baseUrl}/goods/arroundlists`)
}
// 详情
export const getdetailsById = (id) => {
  return http.fetchGet(`${baseUrl}/goods/detailsById?main_id=${id}`)
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost(`${baseUrl}/goods/addCart`, params)
}
