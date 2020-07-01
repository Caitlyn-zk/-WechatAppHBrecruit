
const app = getApp();

import {getUserInfo} from '../../api/user.js';
import { CACHE_USERINFO } from '../../config.js';
import { switchH5Login } from '../../api/api.js';
import authLogin from '../../utils/autuLogin.js';
import util from '../../utils/util.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '0',
      'title': '我的',
      'color': true,
      'class': '0'
    },
    serviceLsit:[
      {
        id: 0,
        url: '/pages/user_post_apply/user_post_apply',
        icon:'/images/personal/icon-apply.png',
        label:'我的申请'
      },
      {
        id: 1,
        url: '/pages/user_instructions/user_instructions',
        icon:'/images/personal/icon-explain.png',
        label:'使用说明'
      },
      {
        id: 2,
        url: '',
        icon:'/images/personal/icon-follow.png',
        label:'关注公众号'
      },
      {
        id: 3,
        url: '3',
        icon:'/images/personal/icon-customer-service.png',
        label:'在线客服'
      },
      {
        id: 4,
        url: '4',
        icon:'/images/personal/icon-phone.png',
        label:'联系客服'
      }
    ],
    userInfo:{},
    MyMenus:[],
    isGoIndex:false,
    iShidden:false,
    isAuto:false,
    switchActive:false,
    loginType: app.globalData.loginType,
    orderStatusNum:{},
    bindPhone: true,
    follow: false,
    windowWidth: 0,
    code:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.login({
      success(res){
        console.log('登陆',res)
        that.setData({
          code: res.code
        })
      }
    })
    this.setData({ 
      MyMenus:app.globalData.MyMenus
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ switchActive: false });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
  onShow:function(){
  
  },

  close:function(){
    this.setData({ switchActive:false});
  },
  /**
   * 授权回调
  */
  onLoadFun:function(e){
    console.log('onLoadFun 登录成功回调')
    this.get_user_base_info();
  },
  
  Setting: function () {
    wx.openSetting({
      success: function (res) {
        console.log(res.authSetting)
      }
    });
  }, 

  get_user_base_info:function(){
    var that=this;
    wx.showLoading({
      title: '加载个人信息'
    })
    getUserInfo().then(res=>{
      if (res.status === 200) {
        console.log('个人信息')
        console.log(res.data)
        that.setData({ userInfo: res.data});
      }
      wx.hideLoading()
    });
  },
  /**
   * 
   * 获取个人中心图标
  */
  getMyMenus: function () {
    // var that = this;
    // if (this.data.MyMenus.length) return;
    // getMenuList().then(res=>{
    //   that.setData({ MyMenus: res.data.routine_my_menus });
    // });
  },
  /**
   * 页面跳转
  */
  goPages:function(e){
    console.log(e.currentTarget.dataset.url)
    if(app.globalData.isLog){
      if (e.currentTarget.dataset.url !== '') {
        if (e.currentTarget.dataset.url == '4') {
          wx.makePhoneCall({
            phoneNumber: '4564964',
          })
        } else {
          wx.navigateTo({
            url: e.currentTarget.dataset.url
          })
        }
      } else {
        this.setData({
          follow: !this.data.follow
        })
      }
    }else{
      this.setData({ iShidden:false});
    }
  },
  // 绑定手机
  onBindPhone () {
    this.setData({
      bindPhone: false
    })
  },
  // 获取参数
  onBind (e) {
    console.log('获取参数',e)
  },
  // 登录
  onLgin () {
    console.log('点击登录')
  },
  // 在线客服
  handleContact (e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  onClose(e){
    this.setData({
      follow: false
    })
  }
})
