import request from "./../utils/request.js";

/**
 * 教育经历
 * @returns {*}
 */
export function recruitUserEduAu(data) {
    return request.post('recruit/user/edu/au', data, { login: false })
}

/**
 * 新增或编辑求职意向
 * @returns {*}
 */
export function recruitUserJwAu(data) {
    return request.post('recruit/user/jw/au', data, { login: false })
}

/**
 * 职位
 * @returns {*}
 */
export function getRecruitData() {
    return request.get('recruit/index', {}, { login: false })
}
// 个人职位详情
export function getUserPostDetail(id) {
    return request.post('recruit/post/getPostDetail', { post_id: id }, { login: false })
}

// 后台职位分类
export function getPostCateTree() {
    return request.get('recruit/cate/tree', {}, { login: false })
}

// 后台管理职位详情
export function getPostdetail(id) {
    return request.get('recruit/post/detail', { id: id }, { login: false })
}



// 前端列表页检索职位列表
export function searchPost(data) {
    return request.get('recruit/search/post', data, { login: false })
}

// ==============================================================后端接口==========================================================================

// 职位手动下架
export function getRecruitPostChangeState(data) {
    return request.post('recruit/post/change/state', data, { login: true })
}

// 后台职位列表
export function getRecruitPostPublicList(data) {
    return request.post('recruit/post/public/list', data, { login: true })
}

// 后台发布职位
export function addUserPost(data) {
    return request.post('recruit/post/public', data, { login: true })
}
// 后台管理 --> 简历状态
/*@param post_id int 职位id
* @param delivery_id int 申请主键id
* @param delivery_status int 状态 10=已查询，20=感兴趣，30=邀面试，40=不合适
*/ 
export function orgResumeState(data) {
    return request.post('recruit/resume/resumeOrg/editUserPostDeliveryStatus', data, { login: true })
}
// 机构查看收到的简历列表
export function orgPostReceiveList(data) {
    return request.post('recruit/resume/resumeOrg/getOrgPostReceiveList', data, { login: true })
}
// 机构人才库 收件箱按职位查看
export function getOrgPostList(data) {
    return request.post('recruit/resume/resumeOrg/getOrgPostList', data, { login: true })
}
// 机构人才库 平台人才库 
export function getResumeUserPool(data) {
    return request.post('recruit/resume/resumeOrg/getResumeUserPool', data, { login: true })
} 

// 机构 简历详情 
export function getOrgUserResumeDetail(resume_id) {
    return request.post('recruit/resume/resumeOrg/getOrgUserResumeDetail', {resume_id: resume_id}, { login: true })
}

// 机构收藏简历
export function orgCollectionUserResume(resume_id) {
    return request.post('/recruit/resume/resumeOrg/orgCollectionUserResume', {resume_id: resume_id}, { login: true })
}

// 机构 简历收藏列表 
export function getOrgCollectionUserResumeList(data) {
    return request.post('/recruit/resume/resumeOrg/getOrgCollectionUserResumeList', data, { login: true })
}

// 机构取消收藏
export function delOrgCollectionUserResume(id) {
    return request.post('/recruit/resume/resumeOrg/delOrgCollectionUserResume', {org_collection_id: id}, { login: true })
}

// ==================== 用户个人信息（简历） ====================
// 用户信息列表
// export function getUserInfoList(resume_id) {
//     return request.get('/recruit/resume/user/info', {resume_id: resume_id}, { login: true })
// }
export function getUserResumeDetail(resume_id) {
    return request.post('/recruit/resume/resumeUser/getUserResumedetail', {resume_id: resume_id}, { login: true })
}


// 编辑用户信息
export function EditUserInfo (data) {
  return request.post('/auth/user/info/au', data, { login: true })
}
// 教育经历列表
export function getUserResumeEduList() {
    return request.get('/recruit/user/edu/list', {}, { login: true })
}

// 保存教育经历
export function addUserResumeEdu(data) {
    return request.post('/recruit/user/edu/au', data, { login: true })
}
// 删除教育经历
export function delUserResumeEdu(id) {
    return request.post('/recruit/user/edu/del', { id: id }, { login: true })
}
// 新增或编辑求职意向
export function addUserResumeJw(data) {
    return request.post('/recruit/user/jw/au', data, { login: true })
}
// 求职意向列表
export function getUserResumeJwList() {
    return request.get('/recruit/user/jw/list', {}, { login: true })
}
// 删除求职意向
export function delUserResumeJw(id) {
    return request.post('/recruit/user/jw/del', { id: id }, { login: true })
}
// 新增或编辑项目经历意向
export function addUserResumeProject(data) {
    return request.post('/recruit/user/pro/au', data, { login: true })
}
// 项目经历列表
export function getUserResumeProject() {
    return request.get('/recruit/user/pro/list', {}, { login: true })
}
// 删除项目经历
export function delUserResumeProject(id) {
    return request.post('/recruit/user/pro/del', { id: id }, { login: true })
}
// 新增或编辑证书
export function addUserCertAu(data) {
    return request.post('/recruit/user/cert/au', data, { login: true })
}
// 证书列表
export function getUserCertList() {
    return request.get('/recruit/user/cert/list', {}, { login: true })
}

// 删除证书
// export function delUserResumeProject (id) {
//   return request.get('/recruit/user/pro/del', {id: id}, {login: true})
// }
// 新增或编辑工作经验
export function addUserResumeWf(data) {
    return request.post('recruit/user/wf/au', data, { login: true })
}
// 工作经历列表
export function getUserResumeWfList() {
    return request.get('recruit/user/wf/list', {}, { login: true })
}
// 注册页工作经验

// 个人注册第三步获取简历列表
export function getUserResumeList(person_reg_state) {
    return request.post('recruit/resume/resumeUser/getUserResumeList', {person_reg_state: person_reg_state}, { login: true })
}
// 删除工作经历列表
export function delUserResumeWf(id) {
    return request.post('recruit/user/wf/del', { id: id }, { login: true })
}
export function delUserCertDel(id) {
    return request.post('recruit/user/cert/del', { id: id }, { login: true })
}
// 新增编辑求职状态
export function addUserJwStateAu(data) {
    return request.post('recruit/user/jw/state/au', data, { login: true })
}
// 新增编辑求职状态
// export function addUserJwRegister(data) {
//     return request.post('/recruit/user/jw/register', data, { login: true })
// }
// export function editUserResume(data) {
//     return request.post('/recruit/resume/resumeUser/editUserResume', data, { login: true })
// }


// 申请(新增)职位
export function applyForPost(post_id,resume_id) {
    return request.post('recruit/resume/resumeUserDelivery/setUserPostDelivery',{post_id: post_id, resume_id: resume_id}, {login: true})
}
// 收藏（新增）职位/公司
export function collectPost(data) {
    return request.post('recruit/resume/userCollection/setUserCollection',data, {login: true})
}
// 取消收藏
export function delCollection(collection_id) {
    return request.post('recruit/resume/userCollection/delUserCollection',{collection_id: collection_id}, {login: true})
}
// 职位收藏列表
export function postCollectionList(data) {
    return request.post('recruit/resume/userCollection/getUserCollectionList',data, {login: true})
}
// 屏蔽公司
export function shieldCompany(org_uid,org_id) {
    return request.post('recruit/resume/resumeUserPrivacy/setUserPrivacy',{org_uid: org_uid,org_id: org_id}, {login: true})
}

// 屏蔽公司列表
export function shieldCompanyList(data) {
    return request.post('recruit/resume/resumeUserPrivacy/getUserPrivacyList',data, {login: true})
}

// 删除屏蔽公司
export function delShieldCompany(privacy_id) {
    return request.post('recruit/resume/resumeUserPrivacy/delUserPrivacy',{privacy_id:privacy_id}, {login: true})
}
// 简历中心 --->列表
export function resumeCenterList() {
    return request.post('recruit/resume/resumeUser/getUserResumeList',{}, {login: true})
}
// 编辑简历 recruit/resume/resumeUser/editUserResume
export function editUserResume(data) {
    return request.post('recruit/resume/resumeUser/editUserResume',data, {login: true})
}
/*
 * 获取用户职位申请列表
 * @param delivery_status int 1全部（默认），10已查阅 ，20感兴趣 ，30邀面试
 * @param page int 第几页
 * @param list_rows int 一页几条
 */
// 申请职位列表  recruit/resume/resumeUserDelivery/getUserPostDeliveryList 
export function getPostDeliveryList(data) {
    return request.post('recruit/resume/resumeUserDelivery/getUserPostDeliveryList ',data, {login: true})
}
