// pages/resume_info/info.js
var app = getApp();
import {
  recruitUserEduAu,
  getPostCateTree
} from  '../../api/recruit.js';
import { getUserregisterEduList } from "../../api/user.js";
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
      'title':'教育经历',
      'color': true,
      'class': '0'
    },
    eduType:[{
        label: '高中及以下',
        value: 0,
    }, {
        label: '大专',
        value: 10,
    }, {
        label: '本科',
        value: 20,
    }, {
        label: '硕士',
        value: 30,
    }, {
        label: '博士',
        value: 40,
    }],
    multiObjArray: [[], []],
    multiIndex: [0, 0],
    index: 0,
    majorList: [],
    // 传参所需
    id: '',
    school: '',
    // 学历
    edu: '',
    eduValue: 0,
    // 上学时间
    begin_dt: '',
    end_dt: '',
    major_id: '',
    major: '',
    resume_id: null,
    daystart: null,
    dayend: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.initValidate()//验证规则函数
    this.getMajorList()
  },
  onShow: function () {
    this.getEduList()
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
      school: {
        required: true,
        minlength: 2
      },
      edu:{
        required:true
      },
      major: {
        required: true
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
    school: {
        required: '请填写学校名称',
        minlength:'请输入正确的学校名称'
      },
      edu:{
        required:'请选择性别'
      },
      major: {
        required: '请选择专业'
      },
      begin_dt: {
        required: "请选择参加工作时间",
        date: ''
      },
      end_dt: {
        required: '请选择出生年月',
        date: ''
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  formSubmit(e) {
    let that = this
    console.log('form发生了submit事件，携带的数据为：',  that.data.resume_id )
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    let daystart = new Date(that.data.begin_dt.replace(/-/g, "/")).getTime()
    let dayend = new Date(that.data.end_dt.replace(/-/g, "/")).getTime()
    if (daystart < dayend) {
      let edulist = {
        id: that.data.id,
        person_reg_state: 20,
        school: that.data.school,
        // 学历
        edu: that.data.edu,
        // 上学时间
        begin_dt: that.data.begin_dt,
        end_dt: that.data.end_dt,
        major_id: that.data.major_id,
        major: that.data.major,
        is_tz: 0,
        resume_id: app.globalData.userInfo.resume_id
      }
      recruitUserEduAu(edulist)
        .then(res => {
          if (res.status === 200) {
            Util.Tips({ title: res.msg });
            // 跳转简历页
            setTimeout(function(){
              wx.navigateTo({
                url: '/pages/user_perfect_jw/user_perfect_jw',
              })
            },1000)
          } else {
            Util.Tips({ title: res.msg });
          }
        })
        .catch(res => {
          Util.Tips({ title: res.msg });
        });
    } else {
      Util.Tips({ title: '请选择正确的时间范围' });
    }
  },
  // 拉取教育经历
  getEduList() {
    let person_reg_state = 20;
    let that = this;
    getUserregisterEduList(person_reg_state)
      .then(res => {
        if (res.status == 200) {
          // let length = res.data.data_list.length
          console.log('简历id')
          console.log(res.data)
          let data = res.data.data_list[0]
          app.globalData.userInfo.resume_id = res.data.resume_id
          that.setData({
            school: data.school,
            edu: data.edu,
            begin_dt: data.begin_dt,
            end_dt: data.end_dt,
            is_tz: data.is_tz,
            multiIndex: data.major_id,
            major: data.major,
            resume_id: res.data.resume_id,
            id: data.id,
            major_id: data.major_id,
          })
        } else {
          Util.Tips({ title: res.msg });
        }
      })
      .catch(res => {
        Util.Tips({ title: res.msg });
      });
  },
    /**
   * 入学时间
   * @param {*} e 
   */
  onStartTime:function (e) {
    let that = this;
    let daystart = new Date(e.detail.value.replace(/-/g, "/")).getTime()
    console.log(daystart)
    this.setData({
      begin_dt:e.detail.value,
      daystart: daystart
    })
  },
  /**
   * 毕业时间
   */
  onEndTimeChange:function (e) {
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
  onPickerChangeEdu: function (e) {
    // console.log('自定义选择器点击的下标', e.detail.value)
    // console.log('这一条的值', this.data.eduType[e.detail.value])
    let eduIndex = e.detail.value
    this.setData({
      // edu: this.data.eduType[eduIndex].label,
      edu: this.data.eduType[eduIndex].value
    })
    console.log('打印')
  },
  // 专业
  bindMultiPickerChange: function (e) {
    console.log('picker改变，携带值为', e.detail.value)
    console.log(e)
    this.setData({
      multiIndex: e.detail.value,
      major: this.data.multiObjArray[1][e.detail.value[1]].cate_name,
      major_id: this.data.multiObjArray[1][e.detail.value[1]].id
    })
  },
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0) {
      this.setData({
        'multiObjArray[1]': this.data.postCateTree[e.detail.value].children,
      });
    }
  },
  schollValue (e) {
    this.setData({
      school: e.detail.value
    })
  },
  // 获取专业数
  getMajorList () {
    getPostCateTree().then(res => {
      console.log('职位分类数据', res.data)
      if (res.status == 200) {
        this.setData({
          postCateTree:res.data,
          'multiObjArray[0]': res.data,
          'multiObjArray[1]': res.data[0].children,
        })
      }
    }).catch( res => {
      Util.Tips({ title: res.msg });
    })
  },
})