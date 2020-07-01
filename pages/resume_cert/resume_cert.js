// pages/resume_info/info.js
import Util from '../../utils/util.js';
import {addUserCertAu,delUserCertDel } from '../../api/recruit.js'
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter:{
      'navbar':'1',
      'return':'1',
      'title':'获得证书',
      'color': true,
      'class': '0'
    },
    resume_id: null,
    id: 0,
    name: '',
    get_dt: '',
    length: 0,
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength: 2
      },
      get_dt:{
        required:true,
        date:true
      },
  }
  const messages = {
    name: {
        required: '请填写证书名称',
        minlength:'请输入正确的证书名称'
      },
      get_dt: {
        required: '请选择获取证书时间',
        date: ''
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()//验证规则函数
    // console.log('状态数据',options.length)
    if (options.model) {
      let data = JSON.parse(options.model)
      this.setData({
        resume_id: data.resume_id,
        id: data.id,
        name: data.name,
        get_dt: data.get_dt,
        length: options.length
      })
    }
  },
  /////////////////////////////////////////
  formSubmit(e) {
    let that = this
    // console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.add()
  },
  /**
   * 获取证书时间
   * @param {*} e 
   */
  onCertTime:function (e) {
    let dayend = new Date(e.detail.value.replace(/-/g, "/")).getTime()
    let date = Date.now()
    if (dayend <= date) {
      this.setData({
        get_dt:e.detail.value
      })
    } else {
      Util.Tips({ title: '请选择有效时间' });
    }
  },
  add () {
    let that = this
    // let cert_image = that.imageData.join(',');
    var parameter = {
      resume_id: that.data.resume_id,
      id: that.data.id,
      name: that.data.name,
      get_dt: that.data.get_dt,
      cert_image: ''
    }
    addUserCertAu(parameter).then(res => {
      if (res.status == 200) {
        Util.Tips({ title: res.msg });
        setTimeout(function(){
          wx.switchTab({ url: '/pages/resume/resume'})
        },1000)
      }
    }).catch(res=>{
      if ([600010, 600020, 600030,600040].indexOf(res.status) !== -1){
          Util.navgationTopPerfectUserResume(res.status);
          Util.Tips({ title: res.msg });
      }
    })
  },
  oncertName:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  onDel () {
    let id  = this.data.id
    wx.showModal({
      title: '提示',
      content: '是否删除该证书',
      success (res) {
        if (res.confirm) {
          delUserCertDel(id).then(res => {
            if (res.status == 200) {
              // this.reload()
              Util.Tips({ title: res.msg });
              setTimeout(function(){
                wx.switchTab({ url: '/pages/resume/resume'})
              },1000)
            } else {
              Util.Tips({ title: res.msg });
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  }
})