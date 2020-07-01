// 自我评价
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter:{
      'navbar':'1',
      'return':'1',
      'title':'自我评价',
      'color': true,
      'class': '0'
    },
    details: '',
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value);
    var that = this;
    that.setData({
      details: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /////////////////////////////////////////
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  
})