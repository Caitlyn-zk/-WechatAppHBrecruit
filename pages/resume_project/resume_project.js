// pages/resume_info/info.js
import {addUserResumeProject, delUserResumeProject} from '../../api/recruit.js'
import Util from '../../utils/util.js';
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter:{
      'navbar':'1',
      'return':'1',
      'title':'项目经历',
      'color': true,
      'class': '0'
    },
    index: 0,
    gender:'',
    startTime:'',
    endTime:'',
    region:[],
    regionValue:'',
    id: 0,
    projectName:'',
    desc:'',
    begin_dt:'',
    end_dt:'',
    projectList:[],
    length: 0,
    daystart: null,
    dayend: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()//验证规则函数
    console.log('状态数据',options.model)
    if (options.model) {
      let data = JSON.parse(options.model)
      this.setData({
        projectList: data,
        id: data.id,
        projectName: data.name,
        begin_dt: data.begin_dt,
        end_dt: data.end_dt,
        desc: data.desc,
        length: options.length
      })
    }
  },
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
      projectName: {
        required: true,
        minlength: 2
      },
      begin_dt: {
        required: true,
        date:true
      },
      end_dt: {
        required: true,
        date:true
      },
  }
  const messages = {
    projectName: {
        required: '请填写学校名称',
        minlength:'请输入正确的学校名称'
      },
      begin_dt: {
        required: "请选择项目开始时间",
        date: ''
      },
      end_dt: {
        required: '请选择项目结束时间',
        date: ''
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
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
    let daystart = new Date(that.data.begin_dt.replace(/-/g, "/")).getTime()
    let dayend = new Date(that.data.end_dt.replace(/-/g, "/")).getTime()
    if (daystart <= dayend) {
      this.add()
    } else {
      Util.Tips({ title: '请选择正确的时间范围' });
    }
    
  },
  /**
   * 开始时间
   * @param {*} e 
   */
  onProjectStartTime:function (e) {
    let daystart = new Date(e.detail.value.replace(/-/g, "/")).getTime()
    this.setData({
      begin_dt:e.detail.value,
      daystart: daystart
    })
  },
  /**
   * 结束时间
   */
  onProjectEndTime:function (e) {
    let that = this;
    let dayend = new Date(e.detail.value.replace(/-/g, "/")).getTime()
    that.setData({
      end_dt:e.detail.value,
      dayend: dayend
    })
  },
  /**
   * 学历选择
   */
  // 期望薪资
  onPickerChangeEdu: function (e) {
    console.log('自定义选择器点击的下标', e.detail.value)
    console.log('这一条的值', this.data.eduType[e.detail.value])
    this.setData({
      eduIndex: e.detail.value
    })
    console.log('打印')
  },
  add () {
    let that = this
    var parameter = {
      id: that.data.id,
      name: that.data.projectName,
      company: that.data.projectList.company,
      begin_dt: that.data.begin_dt,
      end_dt: that.data.end_dt,
      until_now: that.data.projectList.until_now,
      desc: that.data.desc,
      duty: that.data.projectList.duty,
      resume_id: that.data.projectList.resume_id
    }
    console.log('参数', parameter)
    addUserResumeProject(parameter).then(res => {
      if (res.status === 200) {
        Util.Tips({ title: res.msg });
        setTimeout(function(){
          wx.switchTab({ url: '/pages/resume/resume'})
        },1000)
      }
    }).catch(res=>{
      if ([600010, 600020, 600030,600040].indexOf(res.status) !== -1){
        Util.Tips({ title: res.msg });
        Util.navgationTopPerfectUserResume(res.status);
      }
    })
  },
  onDel () {
    let id  = this.data.id
    wx.showModal({
      title: '提示',
      content: '是否删除该项目经历',
      success (res) {
        if (res.confirm) {
          delUserResumeProject(id).then(res => {
            if (res.status === 200) {
              Util.Tips({ title: res.msg });
              setTimeout(function(){
                wx.switchTab({ url: '/pages/resume/resume'})
              },1000)
            } else {
              Util.Tips({ title: res.msg });
            }
          }).catch(res => {
            Util.Tips({ title: res.msg });
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  onProjectName:function (e){
    this.setData({
      projectName: e.detail.value
    })
  },
  bindTextAreaBlur:function (e){
    this.setData({
      desc: e.detail.value
    })
  },
  //字数限制  
  textareaInputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    if(len > this.data.min)
    this.setData({
      desc: " "
    })
    //最多字数限制
    if(len > 200) return;
      // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
      this.setData({
          currentWordNumber: len //当前字数
      });
  }
})