// pages/resume_info/info.js
import { EditUserInfo} from '../../api/recruit.js';
import WxValidate from '../../utils/WxValidate.js'
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
      'title':'个人信息',
      'color': true,
      'class': '0'
    },
    optionList:['男','女'],
    index: 0,
    adas:1,
    region:[],
    live_in_area1: '',
    live_in_area2: '',
    live_in_area3: '',
    live_in_area1_name: '',
    live_in_area2_name: '',
    live_in_area3_name: '',
    genderValue: '',
    birthday: null,
    email: '',
    real_name: '',
    work_date: '',
    gender:'',
    phone: '',
    regionValue:'',
    infoForm: {
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getuser()
    let that = this
    this.initValidate()//验证规则函数
    wx.getStorage({
      key: 'resumeInfo',
      success: function (res) {
        let data = res.data.user_info
        console.log(data)
        let city = [data.live_in_area1_name,data.live_in_area2_name,data.live_in_area3_name]
        that.setData({
          birthday: data.birthday,
          email: data.email,
          phone: app.globalData.userInfo.phone,
          gender: data.gender,
          live_in_area1: data.live_in_area1,
          live_in_area1_name: data.live_in_area1_name,
          live_in_area2: data.live_in_area2,
          live_in_area2_name: data.live_in_area2_name,
          live_in_area3: data.live_in_area3,
          live_in_area3_name: data.live_in_area3_name,
          real_name: data.real_name,
          student: '',
          uid: data.uid,
          work_date: data.work_date,
          genderValue: that.data.optionList[data.gender],
          regionValue: city.length !== 0 ? data.live_in_area2_name+'/'+ data.live_in_area3_name : '',
        })
        console.log(data.birthday)
      }
    })
    
  },

  /////////////////////////////////////////
//报错 
showModal(error) {
  wx.showModal({
    content: error.msg,
    showCancel: false,
  })
},
//验证函数
initValidate() {
  const rules = {
    real_name: {
      required: true,
      minlength: 2
    },
    genderValue:{
      required:true,
    },
    email: {
      required: true,
      email: true
    },
    phone:{
      required:true,
      tel:true
    },
    work_date: {
      required: true,
      date:true
    },
    birthday: {
      required: true,
      date:true
    },
    regionValue: {
      required: true,
    }
  }
  const messages = {
    real_name: {
      required: '请填写姓名',
      minlength:'请输入正确的名称'
    },
    genderValue:{
      required:'请选择性别'
    },
    email: {
      required: '请填写邮箱',
      email: '请填写正确的邮箱'
    },
    work_date: {
      required: "请选择参加工作时间",
      date: ''
    },
    birthday: {
      required: '请选择出生年月',
      date: ''
    },
    regionValue: {
      required: '请选择工作地址',
    }
  }
  this.WxValidate = new WxValidate(rules, messages)
},
//调用验证函数
formSubmit: function(e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    let data = {
      real_name: this.data.real_name,
      gender: this.data.gender,
      birthday: this.data.birthday,
      email: this.data.email,
      work_date: this.data.work_date,
      live_in_area1: this.data.live_in_area1,
      live_in_area2: this.data.live_in_area2,
      live_in_area3: this.data.live_in_area3,
      live_in_area1_name: this.data.live_in_area1_name,
      live_in_area2_name: this.data.live_in_area2_name,
      live_in_area3_name: this.data.live_in_area3_name,
      avatar: '',
      student: '',
    }
    console.log(data)
    // 先拉取数据 成功在执行编辑
    EditUserInfo(data).then(res => {
      if (res.status == 200) {
        console.log('提交成功')
        Util.Tips({ title: res.msg });
        // 跳转简历页
        setTimeout(function(){
          wx.switchTab({ url: '/pages/resume/resume'})
        },1000)
      } else {
        Util.Tips({ title: res.msg });
      }
    }).catch(res => {
      Util.Tips({ title: res.msg });
    })
  },
  // 姓名
  nickName (e) {
    this.setData({
      real_name: e.detail.value
    })
  },
  // 手机
  phoneValue (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 邮件
  emailValue (e) {
    this.setData({
      email: e.detail.value
    })
  },
  /**
   * 出生日期
   * @param {*} e 
   */
  onBirthdayChange:function (e) {
    let dayend = new Date(e.detail.value.replace(/-/g, "/")).getTime()
    let date = Date.now()
    if (dayend < date) {
      this.setData({
        birthday:e.detail.value
      })
    } else {
      Util.Tips({ title: '请选择有效的时间' });
    }
    
  },
  /**
   * 参加工作时间
   */
  onWorkTimeChange:function (e) {
    let dayend = new Date(e.detail.value.replace(/-/g, "/")).getTime()
    let date = Date.now()
    if (dayend <= date) {
      this.setData({
        work_date:e.detail.value
      })
    } else {
      Util.Tips({ title: '请选择有效的时间区间' });
    }
  },
  /**
   * 地区选择
   */
  onRegionChange:function (e){
    console.log(e)
    let city = [e.detail.value[1],e.detail.value[2]]
    this.setData({
      region:[e.detail.value[1],e.detail.value[2]],
      regionValue: city.length !== 0 ? e.detail.value[1]+'/'+ e.detail.value[2] : '',
      live_in_area1: e.detail.code[0],
      live_in_area2: e.detail.code[1] ,
      live_in_area3: e.detail.code[2],
      live_in_area1_name: e.detail.value[0],
      live_in_area2_name: e.detail.value[1],
      live_in_area3_name: e.detail.value[2]
    })
    console.log(this.data.region)
    console.log(e.detail.code)
  },
  /**
   * 性别选择
   */
  bindPickerChange:function (e){
    // console.log('性别选择',JSON.stringify(e))
    let index = e.detail.value
    this.setData({
      gender: e.detail.value,
      genderValue: this.data.optionList[index]
    })
    console.log(this.data.gender)
    console.log(this.data.genderValue)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
    
    //     wx.redirectTo({
    //       url:''
    //     })
    
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

  },
})