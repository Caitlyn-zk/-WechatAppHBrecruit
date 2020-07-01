import request from "./../utils/request.js";

/**
 * 用于请求后台数据进行渲染
 * @module getProjectData
 */
export function getProjectData () {
  return request.get('project/index', {}, { login: false })
}
/**
 * 招标项目检索
 * @module getProjectProSearchList
 */
export function getProjectProSearchList (data) {
  return request.get('/project/pro/search/list', data, { login: false })
}

/**
 * 
 * @param {*} data  
 */
export function proDelete (proid) {
  return request.post('/project/user/pro/delete', {proid:proid}, { login: true })
}



/**
 * 公示项目检索
 * 
 */
export function getProjectNoticeList (data) {
  return request.get('/project/notice/list', data, { login: false })
}

/*
* 项目详情页
*/ 
export function getProjectDetail (proid) {
  return request.get('/project/detail', {proid: proid}, {login: false})
}

/**
 * 项目公示详情
 * @param {*} data 
 */
 export function getProjectNoticeDetail (id) {
  return request.get('/project/notice/detail', {id: id}, {login: false})
}

// 后台
export function getUserProjectListData (data) {
  return request.post('project/user/pro/list', data, { login: true })
}
/**
 * 后台发布项目
 * @module addReleaseProjectData
 */
export function addReleaseProjectData (data) {
  return request.post('/project/user/pro/public', data, {login: true})
}
// 后台项目分类
export function getProjectCateTree () {
  return request.get('/project/cate/tree', {}, { login: true })
}
// 后台环评公示列表
export function getProjectUserNoticeList (data) {
  return request.post('project/user/notice/list', data, { login: true })
}
/**
 * 后台项目管理修改项目的详情
 * @module getUserProjectdetail
 */
export function getUserProjectdetail (proid) {
  return request.get('/project/user/pro/detail', {proid: proid}, {login: true})
}
/**
 * 后台发布公示
 * @module addProjectUserNoticePublic
 */
export function addProjectUserNoticePublic (parameter) {
  return request.post('/project/user/notice/public', parameter, { login: true })
}
// 后台项目管理项目详情
/**
 * 请求后台项目管理项目详情数据
 * @module getProjectNoticedetail
 */
export function getProjectNoticedetail (id) {
  return request.get('/project/user/notice/detail', {id: id}, {
    login: true
  })
}
//  招商项目上下架
export function getProjectUserProChangeState (data) {
  return request.post('/project/user/pro/change/state', data, {login: true})
}

// 职位手动下架
export function getRecruitPostChangeState (data) {
  return request.post('/recruit/post/change/state', data, {login: true})
}
