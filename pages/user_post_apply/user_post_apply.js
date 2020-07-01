// pages/user_post_apply/user_post_apply.js
const app = getApp();
import {getPostDeliveryList} from '../../api/recruit.js'
import util from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '我的申请',
      'color': true,
      'class': '0'
    },
    requestParameters: {
      delivery_status: 20,
      page: 1, // currentPage 当前页码
      list_rows: 5, // list_rows 每页的数据条数
    },
    tabData:[
      {
        value:20,
        label:'已查阅'
      },
      {
        value:30,
        label:'感兴趣'
      },
      {
        value:40,
        label:'邀面试'
      }
    ],
    post_list: [],
    loadingJudge:false,
    applyStatus: false
  },
  onGoBack:function(){
    wx.navigateBack({ changed: true });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
  },
  /**
     * 页面跳转
    */
  goPages:function(e){
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.postDeliveryList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
    if (this.data.post_list !== []) {
      this.data.requestParameters.page = this.data.requestParameters.page + 1
      this.postDeliveryList()
    } else {
      this.data.requestParameters.page = this.data.requestParameters.page - 1
      this.postDeliveryList()
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 
  onChangeTab({ detail: { name } }) {
    console.log('name :', name);
  },
  // 跳转到制定panel
  toPanel({
    currentTarget: {
      dataset: { panelName }
    }
  }) {
    this.selectComponent('#tab').toPanel(panelName);
  },
  onTab(e){
    console.log(e)
    console.log("切换",e.detail)
    if (e.detail === 0) {
       this.setData({
        requestParameters: {
          delivery_status : 20,
          page: 1, // currentPage 当前页码
          list_rows: 5, // list_rows 每页的数据条数
        }
      })
    } else if (e.detail === 1) {
      this.setData({
        requestParameters: {
          delivery_status : 30,
          page: 1, // currentPage 当前页码
          list_rows: 5, // list_rows 每页的数据条数
        }
      })
    } else {
      this.setData({
        requestParameters: {
          delivery_status : 40,
          page: 1, // currentPage 当前页码
          list_rows: 5, // list_rows 每页的数据条数
        }
      })
    }
    this.postDeliveryList()
  },
  postDeliveryList () {
    let that = this
    getPostDeliveryList(this.data.requestParameters).then(res => {
      if (res.status == 200) {
        this.setData({
          applyStatus: res.status
        })
        if (that.data.requestParameters.page > 1 ) {
          that.setData({
            post_list: that.data.post_list.concat(res.data)
          })
        } else {
          that.setData({
            post_list: res.data
          })
        }
        // 下拉
        that.setData({
          loadingJudge: res.data.length !== 5
        })
      } else {
        Util.Tips({ title: res.msg });
      }
      wx.hideLoading()
    }).catch(res => {
      Util.Tips({ title: res.msg });
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
})