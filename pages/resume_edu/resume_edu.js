// pages/resume_info/info.js
import {
  addUserResumeEdu,
  getUserResumeEduList,
  delUserResumeEdu,
  getPostCateTree
} from  '../../api/recruit.js';
import WxValidate from '../../utils/WxValidate.js'
import Util from '../../utils/util.js';
import {tzList} from '../../config/constant.js'
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
    tzList:tzList,
    multiObjArray: [[], []],
    multiIndex: [0, 0],
    eduMultiObjArray: [[], []],
    eduMultiIndex: [0, 0],
    index: 0,
    majorList: [],
    // 传参所需
    id: '',
    school: '',
    // 学历
    edu: '',
    eduValue: null,
    // 上学时间
    begin_dt: '',
    end_dt: '',
    major_id: null,
    major: '',
    resume_id: null,
    length: 0,
    daystart: null,
    dayend: null,
    is_tz: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.initValidate()//验证规则函数
    this.getMajorList()
    console.log(options.id)
    this.setData({
      id: parseInt(options.id),
      length: options.length,
      'eduMultiObjArray[0]': this.data.eduType,
      'eduMultiObjArray[1]': [],
    })
    wx.getStorage({
      key: 'resumeInfo',
      success: function (res) {
        console.log('关于建立')
        console.log(res.data)
        that.setData({
          resume_id: res.data.resume_user.resume_id,
        })
      }
    })
    if (options.id > 0) {
      this.onEduList()
    }
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
        required:'请选择学历'
      },
      major: {
        required: '请选择专业'
      },
      begin_dt: {
        required: "请选择入学时间",
        date: ''
      },
      end_dt: {
        required: '请选择毕业时间',
        date: ''
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  formSubmit(e) {
    let that = this
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    let edulist = {
      id: that.data.id,
      school: params.school,
      // 学历
      edu: that.data.edu,
      // 上学时间
      begin_dt: params.begin_dt,
      end_dt: params.end_dt,
      major_id: that.data.major_id,
      major: params.major,
      is_tz: this.data.is_tz,
      resume_id: that.data.resume_id
    };
    console.log()
    let daystart = new Date(that.data.begin_dt.replace(/-/g, "/")).getTime()
    let dayend = new Date(that.data.end_dt.replace(/-/g, "/")).getTime()
    if (daystart < dayend) {
      addUserResumeEdu(edulist)
      .then(res => {
        if (res.status === 200) {
          Util.Tips({ title: res.msg });
          // 跳转简历页
          setTimeout(function(){
            wx.switchTab({ url: '/pages/resume/resume'})
          },1000)
        } else {
          Util.Tips({ title: res.msg });
        }
      })
      .catch(res => {
        Util.Tips({ title: res.msg });
      });
    } else {
      Util.Tips({ title: '请选择正确时间范围' });
    }
  },
  onEduList () {
    let that = this
    wx.getStorage({
      key: 'resumeInfo',
      success: function (res) {
        let eduList = res.data.edu
        console.log('关于这个')
        console.log(data)
        let data = {}
        eduList.forEach(item => {
          console.log(item)
          if (item.id === that.data.id) {
            data = item
          }
        });
        that.setData({
          resume_id: res.data.resume_id,
          id: data.id,
          school: data.school,
          // edu: data.edu,
          // eduValue: that.data.eduType.label,
          edu: data.edu,
          begin_dt: data.begin_dt,
          end_dt: data.end_dt,
          is_tz: data.is_tz,
          multiIndex: data.major_id,
          major: data.major,
          major_id: data.major_id
        })
      }
    })
  },
  // 删除教育经历
  onDelEdu() {
    let id  = this.data.id
    wx.showModal({
      title: '提示',
      content: '是否删除该教育经历',
      success (res) {
        if (res.confirm) {
          delUserResumeEdu(id).then(res => {
            if (res.status === 200) {
              Util.Tips({ title: res.msg });
              // 跳转简历页
              setTimeout(function(){
                wx.switchTab({ url: '/pages/resume/resume'})
              },1000)
            } else {
              Util.Tips({ title: res.msg });
            }
          })
          .catch(res => {
            Util.Tips({ title: res.msg });
          });
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
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
    console.log('自定义选择器点击的下标', e.detail.value)
    console.log('这一条的值', this.data.eduType[e.detail.value])
    let eduIndex = e.detail.value
    this.setData({
      eduValue: this.data.eduType[eduIndex].label,
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
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0) {
      this.setData({
        'multiObjArray[1]': this.data.postCateTree[e.detail.value].children,
      });
    }
  },
  // 获取专业数
  getMajorList () {
    getPostCateTree().then(res => {
      if (res.status === 200) {
        console.log('职位分类数据', res.data)
        this.setData({
          postCateTree:res.data,
          'multiObjArray[0]': res.data,
          'multiObjArray[1]': res.data[0].children,
        })
      } else {
        Util.Tips({ title: res.msg });
      }
    }).catch(res => {
      Util.Tips({ title: res.msg });
    })
  },
  // 页面渲染
  getUserEduList() {
    getUserResumeEduList().then(res => {
      console.log("数据", JSON.stringify(res.data));
      // 表单中
      // this.eduForm.major_id = res.data
    });
  },
  // 请求学校数据
  onSchoolNameList(school_name) {
    getSchoolNameList(this.eduForm.school).then(res => {
      if (res.status === 200) {
        this.schollList = res.data;
      } else {
        this.schollList = [];
        til.Tips({ title: res.msg });
      }
    }).catch(res => {
        til.Tips({ title: res.msg });
        this.schollList = [];
      });
  },
  schollValue (e) {
    this.setData({
      school: e.detail.value
    })
  },
  onRegionChange:function (e){
    this.setData({
      major:[e.detail.value[1],e.detail.value[2]],
    })
    // console.log(this.data.region)
    // console.log(e.detail.code)
  },
  eduMultiPickerChange: function (e) {
    console.log('picker改变，携带值为', e.detail.value)
    let eduIndex = e.detail.value
    this.setData({
      eduValue: this.data.eduType[eduIndex[0]].label,
      edu: this.data.eduType[eduIndex[0]].value,
      is_tz: eduIndex[1]
    })
  },
  //职位选择
  eduMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column== 0 && e.detail.value > 0) {
      this.setData({
        'eduMultiObjArray[1]': this.data.tzList,
      });
    }
    if (e.detail.column== 0 && e.detail.value == 0) {
      this.setData({
        'eduMultiObjArray[1]': [],
      });
    }
  },
})