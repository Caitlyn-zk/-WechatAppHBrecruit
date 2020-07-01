
import { getPostCateTree,editUserResume} from '../../api/recruit'
import {salaryNumber} from '../../config/constant.js'
import WxValidate from '../../utils/WxValidate.js'
import Util from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter:{
      'navbar':'1',
      'return':'1',
      'title':'求职意向',
      'color': true,
      'class': '0'
    },
    multiObjArray: [[], []],
    multiIndex: [0, 0],
    salaryNumber:salaryNumber,
    wantArray: [
      {
        name: '正在找工作',
        id: 10,
      },
      {
        name: '观望中',
        id: 20,
      },
      {
        name: '不想找工作',
        id: 30,
      }
    ],
    region:[],
    jwList:[],
    jwName:'',
    post_cate_name:'',
    area1_code: null,
    area1_name: '',
    area2_code: null,
    area2_name: '',
    area3_code: null,
    area3_name: '',
    postCateTree:[],
    min_salary:null,
    max_salary:null,
    firstList: [],       
    industryName:[],
    post_id: null,
    post_name: '',
    jobwant_state: null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
    console.log('状态数据',options)
    if (options.model) {
      let data = JSON.parse(options.model)
      console.log('求职意向的')
      console.log(data)
      let a = this.data.wantArray.filter(function(item){
        return item.id === data.jobwant_state
      })
      // console.log('状态数据',a[0].name)
      this.setData({
       jwList: data,
       jwName:a[0].name,
       post_cate_name: data.post_cate_name,
       area1_code: data.area1_code,
       area1_name: data.area1_name,
       area2_code: data.area2_code,
       area2_name: data.area2_name,
       area3_code: data.area3_code,
       area3_name: data.area3_name,
       jobwant_state: data.jobwant_state,
       min_salary: data.min_salary,
       max_salary: data.max_salary,
       post_id:data.post_cate
      })
      // this.onEditUserResume()
    }
    this.getPostClassData()
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
  onEditUserResume(){
    let that = this
    console.log('jwList',that.data.jwList)
    let data = {
      post_cate: that.data.post_id,
      post_cate_name: that.data.post_cate_name,
      min_salary: that.data.min_salary,
      max_salary: that.data.max_salary,
      work_type: that.data.jwList.work_type,
      area1_code: that.data.area1_code,
      area1_name: that.data.area1_name,
      area2_code: that.data.area2_code,
      area2_name: that.data.area2_name,
      area3_code: that.data.area3_code,
      area3_name: that.data.area3_name,
      resume_id: that.data.jwList.resume_id,
      resume_name : that.data.jwList.resume_name,
      jobwant_state: that.data.jobwant_state,
      privacy_state: that.data.jwList.privacy_state,
      in_time: that.data.jwList.in_time
    }
    // console.log('传递参数',JSON.stringify(that.editData))
    editUserResume(data).then(res=>{
      if (res.status==200) {
        // console.log("编辑成功")
        Util.Tips({ title: res.msg });
        setTimeout(function(){
          wx.switchTab({ url: '/pages/resume/resume'})
        },1000)
      }
    })
  },
  initValidate() {
    const rules = {
      jwName: {
        required: true
      },
      region:{
        required:true,
      },
      post_name: {
        required: true,
      },
      
      min_salary: {
        required: true,
      },
      max_salary: {
        required: true,
      },
    }
    const messages = {
      jwName: {
        required: '请选择求职状态'
      },
      region:{
        required:'请选择工作城市'
      },
      post_name: {
        required: '请选择期望职位'
      },
      min_salary: {
        required: "请选择最小薪资",
        date: ''
      },
      max_salary: {
        required: '请选择最大薪资',
        date: ''
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    if (this.data.min_salary < this.data.max_salary) {
      this.onEditUserResume()
    } else {
      Util.Tips({ title: '请注意，最高薪资不能小于最低薪资'});
    }
  },
  // 求职状态
  onPickerChangeJWant: function (e) {
    console.log('自定义选择器点击的下标', e.detail.value)
    console.log('这一条的值', this.data.wantArray[e.detail.value])
    this.setData({
     jwIndex: e.detail.value,
     jwName: this.data.wantArray[e.detail.value].name,
     jobwant_state: this.data.wantArray[e.detail.value].id
    })
  },
  /**
   * 地区选择 
   */
  onRegionChangeCity:function (e){
    console.log('城市数据',e.detail.code[0],e.detail.code[1],e.detail.code[2])
    this.setData({
      region:[e.detail.value[1],e.detail.value[2]],
      area1_code : parseInt(e.detail.code[0]),
      area1_name : e.detail.value[0],
      area2_code : parseInt(e.detail.code[1]),
      area2_name : e.detail.value[1],
      area3_code : parseInt(e.detail.code[2]),
      area3_name : e.detail.value[2]
    })
  },
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
  // 期望薪资
  onMinSalary: function(e){
    console.log('最小薪资')
    this.setData({
      min_salary: this.data.salaryNumber[e.detail.value].value,
    })
  },
  onMaxSalary: function (e){
    this.setData({
      max_salary: this.data.salaryNumber[e.detail.value].value,
    })
  },
  
  bindMultiPickerChange: function (e) {
    console.log('picker改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
      post_cate_name: this.data.multiObjArray[1][e.detail.value[1]].cate_name,
      post_id: this.data.multiObjArray[1][e.detail.value[1]].id
    })
  },

  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0) {
      this.setData({
        'multiObjArray[1]': this.data.postCateTree[e.detail.value].children,
      });
    }
  }
})