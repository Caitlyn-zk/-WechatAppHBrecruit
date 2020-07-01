// pages/resume/resume.js
import {getUserInfo} from '../../api/user.js';
import { CACHE_USERINFO } from '../../config.js';
import {getUserResumeDetail} from '../../api/recruit'
import {workType,inTime,minEdu,salary,tzList,salaryNumber} from '../../config/constant.js'
import Util from '../../utils/util.js';

var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    parameter:{
      'navbar':'1',
      'return':'1',
      'title':'简历'
    },
    age: '25岁',
    work_for:'工作3年',
    workType: workType,
    inTime: inTime,
    minEdu: minEdu,
    salary: salary,
    salaryNumber:salaryNumber,
    tzList: tzList,
    // 个人信息
    userInfoList: {},
    // 求职意向
    jwList: {},
    // 教育背景数据
    educationList: [],
    // 工作经历数据
    workList: [],
    // 证书
    certList: [],
    // 工作项目
    projectList: [],
    resume_id: null,
    update_time: null,
    privacy_state:null,
    userInfo:app.globalData.userInfo,
    resumeState: null,
    mask:true,
    tipsButton:'创建简历',    

    iShidden:true
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.globalData.isLog && app.globalData.userInfo.resume_id > 0){
      this.getUserResumeInfo()
    }else{
      this.setData({
        iShidden:false
      })
    }
  },
  onLoadFun:function(e){
   this.get_user_base_info();
  },
 /**
   * 授权回调
  */
  get_user_base_info:function(){
    var that=this;
    wx.showLoading({
      title: '加载个人信息'
    })
    
    getUserInfo().then(res=>{
      if (res.status === 200) {
        this.getUserResumeInfo()
      }
      wx.hideLoading()
    });
},
  //编辑个人基本信息
  onEditInfo:function () {
    // 跳转
    // wx.navigateTo({ url: '/pages/resume_info/resume_info'})
    console.log(this.data.userInfoList.user_info)
    wx.navigateTo({
      url: '/pages/resume_info/resume_info'
    })
  },
  // 编辑求职意向
  onEditJW:function (){
    // 跳转求职意向页面
    var model = JSON.stringify(this.data.jwList);
    wx.navigateTo({ url: '/pages/resume_jw/resume_jw?model=' + model})
  },
  // 添加工作经历
  onAddWorkFor:function (){
    var model = {resume_id:app.globalData.userInfo.resume_id,id:0};
    wx.navigateTo({ url: '/pages/resume_workfor/resume_workfor?model=' + JSON.stringify(model)})
  },
  // 编辑工作经历
  onEditWorkFor:function (e){
    console.log('编辑工作经历',this.data.workList[e.currentTarget.dataset.id],e.currentTarget.dataset.id)
    var model = JSON.stringify(this.data.workList[e.currentTarget.dataset.id]);
    wx.navigateTo({ url: '/pages/resume_workfor/resume_workfor?model=' + model+'&length='+this.data.workList.length})
  },
  // 编辑教育经历
  onEditEdu:function (e){
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/resume_edu/resume_edu?id='+ id+'&length='+this.data.educationList.length})
  },
  // 添加教育经历
  onAddEdu:function (){
    wx.navigateTo({ url: '/pages/resume_edu/resume_edu?id='+ 0})
  },
  // 编辑项目经历
  onEditProject:function (e){
    var model = JSON.stringify(this.data.projectList[e.currentTarget.dataset.id]);
    wx.navigateTo({ url: '/pages/resume_project/resume_project?model=' + model+'&length='+this.data.projectList.length})
  },
  // 添加项目经历
  onAddProject:function (){
    var model = {resume_id:app.globalData.userInfo.resume_id,id:0};
    wx.navigateTo({ url: '/pages/resume_project/resume_project?model=' + JSON.stringify(model)})
  },
  // 编辑证书
  onEditCert:function (e) {
    var model = JSON.stringify(this.data.certList[e.currentTarget.dataset.id]);
    wx.navigateTo({ url: '/pages/resume_cert/resume_cert?model=' + model+'&length='+this.data.certList.length})
  },
  // 添加证书
  onAddCert:function (){
    var model = {resume_id:app.globalData.userInfo.resume_id,id:0};
    wx.navigateTo({ url: '/pages/resume_cert/resume_cert?model=' + JSON.stringify(model)})
  },
  // 编辑自我评价
  onEditAssessment:function (){
    wx.navigateTo({ url: '/pages/resume_assessment/resume_assessment'})
  },
  getUserResumeInfo () {
    // wx.showLoading({
    //   title: '加载中简历中'
    // })
    // let that = this

    getUserResumeDetail(app.globalData.userInfo.resume_id).then(res => {
      wx.hideLoading()
      if (res.status == 200) {
        this.setData({
          real_name:res.data.user_info.real_name,
          update_time: res.data.resume_user.update_time,
          privacy_state: res.data.resume_user.privacy_state,
          userInfoList: res.data,
          educationList: res.data.edu,
          workList: res.data.work,
          jwList: res.data.resume_user,
          certList: res.data.cert,
          jobWantState: res.data.resume_user,
          projectList: res.data.project,
          resumeState: res.status,
        })
        wx.setStorage({
          key: "resumeInfo",
          data: res.data
        })
      }
      
    }).catch(res=>{
      if ([600010, 600020, 600030,600040].indexOf(res.status) !== -1){
          this.setData({
            resumeState: res.status,
            tipsButton: res.msg
          })
      }
      Util.Tips({ title: res.msg });
    })
  },
  onResume(){
    Util.navgationTopPerfectUserResume(this.data.resumeState);
  }
})