// pages/resume/resume.js
import { getUserPostDetail, applyForPost} from '../../api/recruit.js';
import Util from '../../utils/util.js';
import { getUserInfo} from '../../api/user.js';
import {industryNeighborhood,compayScale,workType,minEdu,workLife,mainSalary} from '../../config/constant.js'
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    parameter:{
      'navbar':'1',
      'return':'1',
      'title':'职位详情'
    },
    detailData: null,
    postList:[],
    industryNeighborhood: industryNeighborhood,
    compayScale: compayScale,
    workType: workType,
    minEdu: minEdu,
    workLife: workLife,
    mainSalary: mainSalary,
    isGoIndex:false,
    iShidden:true,
    isAuto:false,

    isApplying:false,//是否正在投递
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    this.setData({
      post_id: options.postId
    })
    this.getPostDetail()
  },

  // 请求详情数据
  getPostDetail () {
    let that = this
    wx.showLoading({
      title: '加载中'
    })
    getUserPostDetail(this.data.post_id).then(res => {
      wx.hideLoading()
      if (res.status == 200) {
        console.log('简历详情')
        console.log(res.data)
        that.setData({
          detailData: res.data,
          similarPost: res.data.resemble_post,
        })
      } else {
        Util.Tips({ title: res.msg });
      }
    }).catch(res => {
      wx.hideLoading()
      Util.Tips({ title: res.msg });
    })
  },
  // 立即申请职位
  onApplyForPost(e){
    let that = this
    if (app.globalData.isLog) {
      console.log('简历id',app.globalData.userInfo.resume_id)
      applyForPost(that.data.post_id, app.globalData.userInfo.resume_id).then(res => {
        if (res.status == 200) {
          console.log('简历投递状态')
          console.log(res.data)
          Util.Tips({ title: res.msg });
          let array = wx.getStorageSync('apply') || []
          // 向数组中追加
          array.push({
            Key: 'apply',
            post_id: that.data.post_id,
          })
          // 重新设置缓存
          wx.setStorage({
            key: 'apply',
            data: array,
            success: function (res) {}
          })
          this.getPostDetail()
        } else {
          Util.Tips({ title: res.msg });
        }
      }).catch(res => {
        wx.showModal({
          title: '提示',
          content: res.msg,
          success (a) {
            if (a.confirm) {
              if ([600010, 600020, 600030,600040].indexOf(res.status) !== -1){
                Util.navgationTopPerfectUserResume(res.status);
              }
            } else if (a.cancel) {
              that.setData({
                iShidden: true,
              })
            }
          }
        })
      })
    } else {
      //表面正在投递
      this.setData({isApplying: true})
      that.setData({
        iShidden: false
      })
    }
  },
  // 跳转职位详情
  onPostDetaill (e) {
    console.log(e.currentTarget.dataset.postid)
    let postId = e.currentTarget.dataset.postid
    wx.navigateTo({
      url: '/pages/post_detail/post_detail?postId=' + postId,
    })
  },
  /**
   * 授权回调
  */
  onLoadFun:function(e){
    let that = this
    getUserInfo().then(res=>{
      if (res.status === 200) {
        if(that.data.isApplying){
          console.log("getUserInfo")
          that.onApplyForPost()
        }
      }
    });
  },
})