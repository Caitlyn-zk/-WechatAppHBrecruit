// pages/information/information.js
import {setSystemMessageRead,getSystemMessageList} from '../../api/user'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter:{
      'navbar':'1',
      'return':'1',
      'title':'信息',
      'color': true,
      'class': '0'
    },
    index: 0,
    currentPage: 1,
    list_rows:10,
    selectInfo: [],
    infoList:[],
    infoState: null,
    loadingJudge: false,
    isLog:app.globalData.isLog,
    currentTime:new Date().getTime()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_SystemMessageList()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.isLog !==app.globalData.isLog) {
      this.get_SystemMessageList()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.loadingJudge) {
      this.setData({
        currentPage:this.data.currentPage + 1
      })
      this.get_SystemMessageList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  setSystemMessageRead(id){
    setSystemMessageRead(id).then(res=>{
      if (res.status == 200) {
      }
    })
  },
  get_SystemMessageList(){
    wx.showLoading({
      title: '加载中'
    })
    var data = {
      page: this.data.currentPage,
      list_rows: this.data.list_rows
    }
    getSystemMessageList(data).then(res=> {
      if (res.status == 200) {
        var data = res.data.data
        var infoList = []
        for (let index = 0; index < data.length; index++) {
          data[index]['read']=  data[index].is_read == 1
        }
        console.log("消息列表",res.data.data)
        if (this.data.currentPage == 1) {
          this.setData({
            infoList:data,
            infoState: res.status
          })
        } else {
          this.setData({
            infoList:this.data.infoList.concat(data),
            infoState: res.status
          })
        }
        if (res.data.data.length !== this.data.list_rows) {
          this.setData({
            loadingJudge: true
          })
        }
      }
      wx.hideLoading()
    }).catch(res => {
      wx.hideLoading()
    })
  },
  onSee:function(e){
    console.log('消息中心',e.currentTarget.dataset.index)
    var that=this;
    var index = e.currentTarget.dataset.index
    if (e.currentTarget.dataset.read !== 1) {
      that.setSystemMessageRead(e.currentTarget.dataset.id)
    }
    var data = that.data.infoList
    var up = "infoList[" + index + "].read";
    if (!that.data.infoList[index].read) {
      console.log("改变111231")
      that.setData({
        [up] : true
      })
    }
    console.log("改变",that.data.infoList)
    that.setData({
      infoList:data
    })
  }
})