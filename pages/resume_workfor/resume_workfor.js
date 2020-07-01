// pages/resume_workfor/resume_workfor.js
import {salary} from '../../config/constant.js'
import {addUserResumeWf,getPostCateTree, delUserResumeWf} from '../../api/recruit'
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
      'title':'工作经历',
      'color': true,
      'class': '0'
    },
    industry:'',
    salary: null,
    salaryData:salary,
    details:'',
    workList:{},
    id: 0,
    post_name: '',
    company: '',
    skill_tag: '',
    begin_dt: '',
    end_dt: '',
    salary: null,
    desc: '',
    postCateTree:[],
    multiObjArray: [[], []],
    multiIndex: [0, 0],
    length: 0,
    daystart: null,
    dayend: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('状态数据',options.model)
    if (options.model) {
      let data = JSON.parse(options.model)
      this.setData({
        workList:data,
        post_name: data.post_name,
        company: data.company,
        skill_tag: data.skill_tag,
        begin_dt: data.begin_dt,
        end_dt: data.end_dt,
        salary: data.salary,
        desc: data.desc,
        id: data.id,
        length: options.length
      })
    }
    this.initValidate()
    this.getPostClassData()
  },

  onStartTime:function(e){
    let daystart = new Date(e.detail.value.replace(/-/g, "/")).getTime()
    this.setData({
      begin_dt: e.detail.value,
      daystart: daystart
    })
  },
  onEndTime:function(e){
    let that = this;
    let dayend = new Date(e.detail.value.replace(/-/g, "/")).getTime()
    that.setData({
       end_dt: e.detail.value,
       dayend: dayend
     })
  },
  onPickerChangeSalary:function(e){
    console.log("salary 选择",e.detail.value)
    this.setData({
      salary: this.data.salaryData[e.detail.value].value
    })
  },
  // 添加工作经历
  addWf () {
    // let salary = data.salary
    // salary *= 1
    let data = {
      id: this.data.id,
      post_name: this.data.post_name,
      company:  this.data.company,
      skill_tag:  this.data.skill_tag,
      begin_dt:  this.data.begin_dt,
      end_dt:  this.data.end_dt,
      salary:  this.data.salary,
      desc:  this.data.desc,
      resume_id: this.data.workList.resume_id
    }
    addUserResumeWf(data).then(res => {
      if (res.status === 200) {
        Util.Tips({ title: res.msg });
        setTimeout(function(){
          wx.switchTab({ url: '/pages/resume/resume'})
        },1000)
      } 
    }).catch(res => {
      Util.Tips({ title: res.msg });
    })
  },
  // 删除工作经历
  onDelWf () {
    let id  = this.data.id
    wx.showModal({
      title: '提示',
      content: '是否删除该工作经历',
      success (res) {
        if (res.confirm) {
          delUserResumeWf(id).then(res => {
            if (res.status === 200) {
              Util.Tips({ title: res.msg });
              setTimeout(function() {
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
  // 获取职位分类数据
  getPostClassData () {
    getPostCateTree().then(res => {
      console.log('职位分类数据', res.data)
      this.setData({
        postCateTree:res.data,
        'multiObjArray[0]': res.data,
        'multiObjArray[1]': res.data[0].children,
      })
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
      post_name: this.data.multiObjArray[1][e.detail.value[1]].cate_name,
    })
  },
  //职位选择
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0) {
      this.setData({
        'multiObjArray[1]': this.data.postCateTree[e.detail.value].children,
      });
    }
  },
  onCompany:function (e){
    // console.log('公司名称',e.detail)
    this.setData({
      company:e.detail.value
    })
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
      company: {
        required: true,
      },
      post_name:{
        required:true
      },
      begin_dt: {
        required: true,
        date:true
      },
      end_dt: {
        required: true,
        date:true
      },
      salary: {
        required: true
      },
      desc: {
        required: true
      },
  }
  const messages = {
    company: {
        required: '请填写公司名称',
    },
    post_name:{
      required:'请选择职位名称'
    },
    begin_dt: {
      required: '请选择在职开始时间'
    },
    end_dt: {
      required: "请选择在职结束时间"
    },
    salary: {
      required: "请选择月薪"
    },
    desc:{
      required: '请填写工作描述'
    }
  }
    this.WxValidate = new WxValidate(rules, messages)
  },
  formSubmit(e){
    let that = this
    // console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    } else {
      let daystart = new Date(that.data.begin_dt.replace(/-/g, "/")).getTime()
      let dayend = new Date(that.data.end_dt.replace(/-/g, "/")).getTime()
      if (daystart <= dayend) {
        this.addWf()
      } else {
        // this.showModal(error)
        Util.Tips({ title: '请选择正确时间范围' });
      }
      
    }
  },
  bindTextAreaBlur:function (e){
    console.log('工作描述',e.detail.value)
    this.setData({
      desc:e.detail.value
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