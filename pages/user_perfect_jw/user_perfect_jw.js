import {editUserResume,getPostCateTree,getUserResumeList} from "../../api/recruit";
import { salaryNumber,inTime,workType} from "../../config/constant";
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
      'title':'求职意向',
      'color': true,
      'class': '0'
    },
    wantArray: [
      {
        label: '正在找工作',
        value: 10,
      },
      {
        label: '观望中',
        value: 20,
      },
      {
        label: '不想找工作',
        value: 30,
      }
    ],
    region:[],
    salaryNumber:salaryNumber,
    workType:workType,
    postCateTree:[],
    multiObjArray: [[], []],
    multiIndex: [0, 0],
    min_salary: null,
    max_salary: null,
    post_name: '',
    post_cate: null,
    inTime: inTime,
    in_time:'',
    area1_code: null,
    area1_name: '',
    area2_code: null,
    area2_name: '',
    area3_code: null,
    area3_name: '',
    resume_id: null,
    resume_name: '',
    privacy_state: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPostClassData()
    this.initValidate()
  },
  onShow: function () {
    this.getJwList()
  },
  // **************************************
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  initValidate() {
    const rules = {
      jwIndex: {
        required: true
      },
      in_time:{
        required:true,
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
      workTypeIndex: {
        required: true,
      }
    }
    const messages = {
      jwIndex: {
        required: '请选择求职状态'
      },
      in_time:{
        required:'请选择到岗时间'
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
      workTypeIndex: {
        required: '请选择职位类型',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  formSubmit(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    if (this.data.min_salary < this.data.max_salary) {
      this.add()
    } else {
      Util.Tips({ title: '请注意，最高薪资不能小于最低薪资' });
    }
  },
  // 求职状态
  onPickerChangeJWant: function (e) {
    console.log('自定义选择器点击的下标', e.detail.value)
    console.log('这一条的值', this.data.wantArray[e.detail.value])
    this.setData({
     jwIndex: this.data.wantArray[e.detail.value].value
    })
  },
  //到岗时间
  onPickerChangeInTime:function (e){
    console.log('自定义选择器点击的下标', e.detail.value)
    this.setData({
      in_time: this.data.inTime[e.detail.value].value
     })
  },
  /**
   * 地区选择
   */
  onRegionChangeCity:function (e){
    console.log('城市选择',e)
    this.setData({
      region:[e.detail.value[0],e.detail.value[1],e.detail.value[2]],
      area1_code: e.detail.code[0],
      area1_name: e.detail.value[0],
      area2_code: e.detail.code[1],
      area2_name: e.detail.value[1],
      area3_code: e.detail.code[2],
      area3_name: e.detail.value[2],
    })
  },
  // 期望薪资
  onPickerChangeSalary: function (e) {
    console.log('自定义选择器点击的下标', e.detail.value)
    console.log('这一条的值', this.data.salary[e.detail.value])
    this.setData({
      salaryIndex: e.detail.value
    })
    console.log('打印')
  },
  onPickerChangeWorkType: function (e) {
    console.log('自定义选择器点击的下标', e.detail.value)
    console.log('这一条的值', this.data.workType[e.detail.value])
    this.setData({
      workTypeIndex: this.data.workType[e.detail.value].value
    })
    console.log('打印')
  },
  add() {
    let that = this;
    var parameter = {
        person_reg_state: 30,
        resume_id: that.data.resume_id,
        resume_name: that.data.resume_name,
        privacy_state: that.data.privacy_state,
        post_cate: that.data.post_cate,
        post_cate_name: that.data.post_name,
        area1_code: that.data.area1_code,
        area1_name: that.data.area1_name,
        area2_code: that.data.area2_code,
        area2_name: that.data.area2_name,
        area3_code: that.data.area3_code,
        area3_name: that.data.area3_name,
        min_salary: that.data.min_salary,
        max_salary: that.data.max_salary,
        work_type: that.data.workTypeIndex,
        jobwant_state: that.data.jwIndex,
        in_time: that.data.in_time
    };

    editUserResume(parameter).then(res => {
      if (res.status === 200) {
        let pages = getCurrentPages();
        let delta = 0;
        for (let index = 0; index < pages.length; index++) {
          const element = pages[index];
          if(element.route.indexOf('pages/user_perfect_info') !== -1){
            delta = delta+1;
          }else if(element.route.indexOf('pages/user_perfect_edu') !== -1){
            delta = delta+1;
          }else if(element.route.indexOf('pages/user_perfect_jw') !== -1){
            delta = delta+1;
          }
        }
        Util.Tips({ title: res.msg });
        setTimeout(function(){
          wx.navigateBack({
            delta: delta
          })
        },1000)
      } else {
        Util.Tips({ title: res.msg });
      }
    }).catch(res => {
      Util.Tips({ title: res.msg });
    });
  },
  // 职位
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
      post_cate: this.data.multiObjArray[1][e.detail.value[1]].id
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
  // 最小薪资
  onMinSalary: function(e){
    this.setData({
      min_salary: this.data.salaryNumber[e.detail.value].value
    })
  },
  // 最大薪资
  onMaxSalary: function (e){
    let that = this 
    that.setData({
      max_salary: that.data.salaryNumber[e.detail.value].value
    })
  },
  
  // 拉取工作经历
  getJwList() {
    let person_reg_state = 30;
    let that = this;
    getUserResumeList(person_reg_state)
      .then(res => {
        if (res.status == 200) {
          this.setData({
            resume_id : res.data.resume_list[0].resume_id,
            resume_name : res.data.resume_list[0].resume_name,
            privacy_state : res.data.resume_list[0].privacy_state
          })
          console.log(res.data.resume_list[0].resume_id)
          console.log(res.data)
          let data = res.data.resume_list[0]
          if (res.data.resume_list.length > 0) {
            this.setData({
              post_cate : data.post_cate,
              post_name: data.post_cate_name,
              min_salary : data.min_salary,
              max_salary : data.max_salary,
              state : data.state,
              in_time : data.in_time,
              area1_code: data.area1_code,
              area1_name: data.area1_name,
              area2_code: data.area2_code,
              area2_name: data.area2_name,
              area3_code: data.area3_code,
              area3_name: data.area3_name,
              jwIndex: data.jobwant_state,
              workTypeIndex : data.work_type,
              region: data.area1_name === '' ? '' :[data.area1_name,data.area2_name,data.area3_name],
            })
          } else {
            that.jW_id = 0;
          }
        }
      })
      .catch(res => {
        Util.Tips({ title: res.msg});
      });
  },
})