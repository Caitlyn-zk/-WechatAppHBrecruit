const app = getApp();
import { getRecommendPostList } from '../../api/user.js';
import { searchPost} from '../../api/recruit.js';
// import Util from '../../utils/util.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    parameter:{
      'navbar': '1',
      'return': '1',
      'title': '环科宝招聘'
    },
    interval: 2000,
    duration: 500,
    postList: [],
    page: 1,
    loadingJudge: false,
    list_rows: 10,
    // isLog: false,
    isLog:app.globalData.isLog,
    jobIntention:true,
    post_cate_name:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.rendering()
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.isLog !== app.globalData.isLog) {
      this.rendering()
    }else if (app.globalData.userInfo.post_cate_name !== undefined  ) {
      if (this.data.post_cate_name !== app.globalData.userInfo.post_cate_name) {
        this.rendering()
      }
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.loadingJudge) {
      this.setData({
        page:this.data.page + 1
      })
      if (this.data.isLog && this.data.jobIntention) {
        this.get_RecommendPostList()
      }else{
        this.getSearchPost()
      }
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  rendering(){
    this.setData({
      isLog:app.globalData.isLog,
      post_cate_name:app.globalData.userInfo.post_cate_name == undefined ? '' :app.globalData.userInfo.post_cate_name,
      postList:[]
    })
    if (this.data.isLog) {
      if (this.data.post_cate_name == '') {
        this.getSearchPost()
        this.setData({isLog:app.globalData.isLog,jobIntention:false})
      } else {
        this.get_RecommendPostList()
      }
    }else{
      this.getSearchPost()
    }
  },
  onInput: function (e){
    // console.log('搜索值',e)
    wx.navigateTo({ url: '/pages/post_search/post_search?key='+ e.detail.value });
  },
  // 推荐职位
  get_RecommendPostList(){
    wx.showLoading({
      title: '加载中'
    })
    var that = this;
    getRecommendPostList({
      page: that.data.page,
      list_rows: that.data.list_rows
    }).then(res=>{
      console.log(res.data)
      if (res.status == 200) {
        if (that.data.page >1 ) {
          that.setData({
            postList: that.data.postList.concat(res.data)
          })
        } else {
          that.setData({
            postList: res.data
          })
        }
        that.setData({
          loadingJudge: res.data.length !==10
        })
        wx.hideLoading()
      }
    }).catch(res => {
      // if ([600010, 600020, 600030,600040].indexOf(res.status) !== -1){
      //   Util.navgationTopPerfectUserResume(res.status);
      // }
      wx.hideLoading()
    })
  },
  getSearchPost(){
    var that = this;
    console.log('搜索')
    wx.showLoading({
      title: '加载中'
    })
    searchPost({
      key: '',
      edu: '',
      page: that.data.page
    }).then(res=>{
      console.log(res.data)
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
      }
      that.setData({
        loadingJudge: res.data.data_list.length !==10
      })
      console.log("res.data.data_list.length",that.data.loadingJudge)
      wx.hideLoading()
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
  onRecommend:function(e){
    wx.navigateTo({ url: `/pages/post_search/post_search?key=`+ e.currentTarget.dataset.value });
  },
  // 广告跳转
  onAd(){
    
  }
})
