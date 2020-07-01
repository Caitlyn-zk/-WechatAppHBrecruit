
import { searchPost} from '../../api/recruit.js';
import { workType,salary} from '../../config/constant.js'
import {cityList} from '../../config/city.js'
import Util from '../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter:{
      'navbar':'1',
      'return':'1',
      'title':'职位搜索',
      'color': true,
      'class': '0'
    },
    citySelect:'全国',
    salarySelect:'薪资',
    postType:'职位类型',
    search:'',
    postList:[],
    key:'',
    page: 1,
    loadingJudge: false,
    cityPopup: false,
    salaryPopup: false,
    salaryData:[{
        value: 0,
        label: '不限'
      },{
        value: 1,
        label: '1k-5k'
      }, {
          value: 2,
          label: '5k-10k'
      }, {
          value: 3,
          label: '10k-15k'
      }, {
          value: 4,
          label: '15k-20k'
      }, {
          value: 5,
          label: '20k-25k'
      }, {
          value: 6,
          label: '25k-30k'
      }, {
          value: 7,
          label: '30k-35k'
      }, {
          value: 8,
          label: '35k-40k'
      }, {
          value: 9,
          label: '40k-45k'
      },{
        value: 9,
        label: '40k-45k'
      },{
        value: 10,
        label: '45k-50k'
      },{
        value: 9,
        label: '50k'
    },],
    postPopup: false,
    workType:workType,
    postTypeId: 0,
    cityGroup:cityList.cityGroup,
    hotCityList:cityList.hotCityList,
    cityId: 0,
    salaryId: null,
    min_salary: 0,
    max_salary: 0,
    salarySelectData:[{
        min_salary: 0,
        max_salary: 0
      },{
        min_salary: 1,
        max_salary: 5
      }, {
        min_salary: 5,
        max_salary: 10
      }, {
        min_salary: 10,
        max_salary: 15
      }, {
        min_salary: 15,
        max_salary: 20
      }, {
        min_salary: 20,
        max_salary: 25
      }, {
        min_salary: 25,
        max_salary: 30
      }, {
        min_salary: 30,
        max_salary: 35
      }, {
        min_salary: 35,
        max_salary: 40
      }, {
        min_salary: 40,
        max_salary: 45
      },{
        min_salary: 45,
        max_salary: 50
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('cityData',this.data.cityGroup)
    this.setData({
      key:options.key
    })
    this.getSearchPost()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('列表',11)
    if (!this.data.loadingJudge) {
      this.setData({
        page:this.data.page + 1
      })
      this.getSearchPost()
    }
  },

  // 方法 、事件
  onSearchbar: function(e){
    console.log("搜索",e)
    this.setData({
      key:e.detail.value
    })
    this.getSearchPost()
  },
  getSearchPost(){
    wx.showLoading({
      title: '加载中'
    })
    var that = this;
    searchPost({
      // edu: '',
      area2: that.data.cityId == null ? 0: that.data.cityId,
      work_type: that.data.postTypeId == null ? 0 : that.data.postTypeId,
      // work_life: null,
      min_salary: that.data.min_salary,
      max_salary: that.data.min_salary,
      // postcateid: '',
      key: that.data.key == undefined ? '' : that.data.key,
      edu: '',
      page: that.data.page
    }).then(res=>{
      // console.log('post_list',JSON.stringify(res))
      if (res.status == 200) {
        if (that.data.page >1 ) {
          that.setData({
            postList: that.data.postList.concat(res.data.data_list)
          })
        } else {
          that.setData({
            postList: res.data.data_list
          })
        }
        that.setData({
          loadingJudge: res.data.data_list.length !==10
        })
      }
      wx.hideLoading()
    }).catch(res=>{
      Util.Tips({ title: res.msg });
      wx.hideLoading()
    })
  },
  onCity(){
    this.setData({
      cityPopup: !this.data.cityPopup,
      salaryPopup: false,
      postPopup: false
    })
  },
  onSalary(){
    this.setData({
      cityPopup: false,
      salaryPopup: !this.data.salaryPopup,
      postPopup: false
    })
  },
  onPostType(){
    this.setData({
      cityPopup: false,
      salaryPopup: false,
      postPopup: !this.data.postPopup,
    })
  },
  // 选择职位类型
  onSelectWorkType(e){
    console.log('选择',JSON.stringify(e))
    this.setData({
      postTypeId: e.detail.value == 0 ? null : e.detail.value,
      postType: e.detail.label == '不限' ? '职位类型': e.detail.label,
      postPopup: false,
      page: 1
    })
    this.getSearchPost()
  },
  onSelectCity:function(e){
    console.log('城市选择',e)
    this.setData({
      cityId: e.detail.value == 0 ? null : e.detail.value,
      citySelect: e.detail.label,
      cityPopup: false,
      page: 1,
    })
    this.getSearchPost()
  },
  onSelectSalary:function (e) {
    this.setData({
      salaryId: e.detail.value == 0 ? null : e.detail.value,
      salarySelect: e.detail.label == '不限' ? '薪资': e.detail.label,
      salaryPopup: false,
      page: 1,
      min_salary: this.data.salarySelectData[e.detail.value].min_salary,
      max_salary: this.data.salarySelectData[e.detail.value].max_salary,
    })
    this.getSearchPost()
  },
  onFocus(e){
    this.setData({
      cityPopup: false,
      salaryPopup: false,
      postPopup: false
    })
  },
   // 跳转职位详情
   onPostDetaill (e) {
    console.log(e.currentTarget.dataset.postid)
    let postId = e.currentTarget.dataset.postid
    wx.navigateTo({
      url: '/pages/post_detail/post_detail?postId=' + postId,
    })
  },
  // 关闭筛选
  onClose(){
    this.setData({
      cityPopup: false,
      salaryPopup: false,
      postPopup: false
    })
  }
})