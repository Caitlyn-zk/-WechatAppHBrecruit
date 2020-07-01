// pages/user_instructions/user_instructions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '使用说明',
      'color': true,
      'class': '0'
    },
    instructionsList: [{
      id: 1,
      question: 'Q:投错简历怎么办，可以撤回吗？',
      answer: 'A:已投递的简历是无法撤回的，所以在投递简历时请看清楚招聘信息。'
    },{
      id: 2,
      question: 'Q:职位搜索页面，招聘职位的显示是随机的吗？',
      answer: 'A:职位搜索结果页面，按照职位发布先后时间来排序，最新的排在最上面。'
    },{
      id: 3,
      question: 'Q:为什么默认城市有时候不太准确？',
      answer: 'A:由于我们定位是基于手机GPS和基站来共同定位的，如果基站信息不准确是会影响到我们定位的准确性。'
    },{
      id: 4,
      question: 'Q:为什么我投递了很多职位，但是企业反馈很少？',
      answer: 'A:尝试使用关键字近义词进行搜索，适当调整或放宽职位筛选条件。'
    },{
      id: 5,
      question: 'Q:搜索到的职位是否都有效？',
      answer: 'A:职位搜索中可以查看到的都是有效职位，并且系统每天会自动推送最新职位。'
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})