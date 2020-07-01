import request from "./../utils/request.js";

/**
 * 职位
 * @returns {*}
 */
export function getHomeData () {
  return request.get('index/data', {}, { login: false })
}

export function getGSData (page) {
  return request.get('index/gsxm', {page: page}, { login: false })
}

export function getZbData (page) {
  return request.get('index/zbxm', {page: page}, { login: false })
}

export function getPostData (page) {
  return request.get('index/post', {page: page}, { login: false })
}

/**
 *  图片上传 
 *  avatar=头像上传  cert=证书上传  license=营业执照
 */

export function uploadImage (data) {
  return request.post('user/upload/uploadImage', data, { login: true })
}
export function getUpToken (data) {
  return request.post('user/upload/getUpToken', data, { login: true })
}

/**
 * 绑定手机 auth/binding
 */

export function bindingPhone (data) {
  return request.post('auth/binding', data, { login: true })
}
// 学校名字解锁
export function getSchoolNameList (school_name) {
  return request.post('user/getSchoolNameList', {school_name: school_name}, {login: true})
}
/**
 * 职位管理的接口
 **/

// /**
//  * 获取微信sdk配置
//  * @returns {*}
//  */
// export function getWechatConfig () {
//   return request.get(
//     '/wechat/config',
//     { url: document.location.href },
//     { login: false }
//   )
// }

// /**
//  * 获取微信sdk配置
//  * @returns {*}
//  */
// export function wechatAuth (code, spread, login_type) {
//   return request.get(
//     '/wechat/auth',
//     { code, spread, login_type },
//     { login: false }
//   )
// }
