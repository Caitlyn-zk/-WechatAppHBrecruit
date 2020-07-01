import request from "./../utils/request.js";
const app = getApp();
import { CACHE_USERINFO } from '../config.js';
/**
 * 
 * 用户相关接口
 * 
*/

/**
 * 用户基本信息
 * @param data object 用户信息
 */
export function authUserInfoAu(data) {
  return request.post('auth/user/info/au', data, { login: false })
}

/**
* 用户个人中心
* @param {*} data  
*/
export function userAdminIndex() {
  return request.post('user/userInfo/userAdminIndex', {}, { login: true })
}

/**
* 用户个人中心 推荐岗位列表
* @param {*} data 
*/
export function getRecommendPostList(data) {
  return request.post('user/userInfo/getRecommendPostList', data, { login: true })
}



/**
* 获取二维码
*/

export function getAccountQrcodeUrl() {
  return request.get('auth/getAccountQrcodeUrl',{}, { login: false })
}

/**
* 微信轮询登录
*/
export function wechatPollingLogin(uu_str) {
  return request.post('auth/wechatPollingLogin', {uu_str:uu_str},{ login: false })
}

/**
* 用户退出登录
*/
export function logout() {
  return request.get('auth/logout', {}, { login: false })
}
/**
* 用户发送验证码
* @param data object 手机号&验证码
*/
export function registerVerify(data) {
  return request.post('auth/code/verify', data, { login: false })
}
/**
* 用户注册
* @param data object 手机号&验证码$密码
*/
export function register(data) {
  return request.post('auth/phone/register', data, { login: false })
}

/**
* 用户手机号修改密码
* @param data object 用户手机号 验证码 密码
*/
export function registerReset(data) {
  return request.post('auth/reset/pwd', data, { login: false })
}

// 教育经历列表
export function getUserregisterEduList(person_reg_state) {
  return request.get('recruit/user/edu/list', {person_reg_state: person_reg_state}, { login: true })
}
/**
* 获取机构基本信息
*/
export function getUserOrgInfo (data) {
  return request.post('auth/user/org/info',data, {login: true})
}
/**
* 企业端完善个人信息
*/
export function authUserOrgAu (data) {
  return request.post('auth/user/org/au',data, {login: true})
}
/**
* 注册填写公司信息
*/
export function authUserOrgPerfect (data) {
  return request.post('auth/user/org/perfect',data, {login: true})
}
/**
* 确认公司需求新增
*/
export function authUserOrgNeedAu (data) {
  return request.post('auth/user/org/need/au',data, {login: true})
}
// 企业中心个人资料修改
export function authUserOrgEdit (data) {
  return request.post('user/userOrg/editUserOrg', data, {login: true})
}
// 企业中心个人资料拉取
export function getUserOrgData () {
  return request.post('user/userOrg/getUserOrg', {}, {login: true})
}
// 企业中心企业信息资料拉取
export function getOrgInfoData () {
  return request.post('user/userOrg/getOrgInfo', {}, {login: true})
}
/**
* 消息中心 消息列表
*/
export function getSystemMessageList (data) {
  return request.post('user/getSystemMessageList',data, {login: true})
}

/**
* 消息状态改变 
*/
export function setSystemMessageRead (id) {
  return request.post('user/setSystemMessageRead',{ms_id:id}, {login: true})
}

/**
 * 小程序用户登录
 * @param data object 小程序用户登陆信息
 */
export function login(data) {
  return request.post("wechat/mp_auth", data, { login : false });
}


/**
 * 获取用户中心菜单
 *
 */
export function getMenuList() {
  return request.get("menu/user");
}

/**
 * 获取用户信息
 * 
*/
export function getUserInfo(person_reg_state){

  return new Promise((reslove, reject) => {
    request.post('auth/user/base/info',{person_reg_state:person_reg_state}, {login: true}).then(res=>{
      if (res.status === 200) {
        wx.setStorageSync(CACHE_USERINFO, JSON.stringify(res.data));
        app.globalData.userInfo = res.data
      }
      reslove(res)
    }).catch(res=>{
      reject(res)
    })
  })
}

/**
 * 修改用户信息
 * @param object
*/
export function userEdit(data){
  return request.post('user/edit',data);
}


/**
 * 会员等级列表
 * 
*/
export function userLevelGrade(){
  return request.get('user/level/grade');
}

/**
 * 获取某个等级任务
 * @param int id 任务id
*/
export function userLevelTask(id){
  return request.get('user/level/task/'+id);
}

/**
 * 检查用户是否可以成为会员
 * 
*/
export function userLevelDetection(){
  return request.get('user/level/detection');
}

/**
 * 获取分销海报图片
 * 
*/
export function spreadBanner(){
  return request.get('spread/banner',{type:1});
}

/**
 *
 * 获取推广用户一级和二级
 * @param object data
*/
export function spreadPeople(data){
  return request.post('spread/people',data);
}

/**
 * 
 * 推广佣金明细
 * @param int type 
 * @param object data
*/
export function spreadCommission(type,data){
  return request.get('spread/commission/'+type,data);
}

/**
 * 
 * 推广佣金/提现总和
 * @param int type
*/
export function spreadCount(type){
  return request.get('spread/count/'+type);
}

/**
 * 
 * 推广订单
 * @param object data
*/
export function spreadOrder(data){
  return request.post('spread/order',data);
}

/**
 * 提现申请
 * @param object data
*/
export function extractCash(data){
  return request.post('extract/cash',data)
}

/**
 * 提现银行/提现最低金额
 * 
*/
export function extractBank(){
  return request.get('extract/bank');
}

/**
 * 活动状态
 * 
*/
export function userActivity(){
  return request.get('user/activity');
}

/**
 * 小程序充值
 * 
*/
export function rechargeRoutine(data){
  return request.post('recharge/routine',data)
}

/**
 * 
 * 地址列表
 * @param object data
*/
export function getAddressList(data){
  return request.get('address/list',data);
}

/**
 * 设置默认地址
 * @param int id
*/
export function setAddressDefault(id){
  return request.post('address/default/set',{id:id})
}

/**
 * 获取默认地址
 * 
*/
export function getAddressDefault(){
  return request.get('address/default');
}
/**
 * 删除地址
 * @param int id
 * 
*/
export function delAddress(id){
  return request.post('address/del',{id:id})
}

/**
 * 修改 添加地址
 * @param object data
*/
export function editAddress(data){
  return request.post('address/edit',data);
}

/**
 * 获取单个地址
 * @param int id 
*/
export function getAddressDetail(id){
  return request.get('address/detail/'+id);
}

/**
 * 设置用户分享
 * 
*/
export function userShare(){
  return request.post('user/share');
}

/**
 * 获取签到配置
 * 
*/
export function getSignConfig(){
  return request.get('sign/config')
}

/**
 * 获取签到列表
 * @param object data
*/
export function getSignList(data){
  return request.get('sign/list',data);
}

/**
 * 签到列表(年月)
 * @param object data
 * 
*/
export function getSignMonthList(data){
  return request.get('sign/month',data)
}

/**
 * 用户签到
*/
export function setSignIntegral(){
  return request.post('sign/integral')
}
/*
 * 资金明细（types|0=全部,1=消费,2=充值,3=返佣,4=提现）
 * */
export function getCommissionInfo(q, types) {
  return request.get("spread/commission/" + types, q);
}
/*
 * 签到用户信息
 * */
export function postSignUser(sign) {
  return request.post("sign/user", sign);
}
/*
 * 积分记录
 * */
export function getIntegralList(q) {
  return request.get("integral/list", q);
}
/*
 * 点击领取优惠券
 * */
export function getCouponReceive(couponId) {
  return request.post("coupon/receive", couponId);
}
/*
 * 领取优惠券列表
 * */
export function getCoupon(q) {
  return request.get("coupons", q);
}
/*
 * 获取推广人排行
 * */
export function getRankList(q) {
  return request.get("rank", q);
}
/*
 * 获取佣金排名
 * */
export function getBrokerageRank(q) {
  return request.get("brokerage_rank", q);
}
/**
 * 充值金额选择
*/
export function getRechargeApi() {
  return request.get('recharge/index')
}