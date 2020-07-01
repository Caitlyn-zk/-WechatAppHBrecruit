var app = getApp();
Component({
  properties: {
    parameter:{
      type: Object,
      value:{
        class:'0'
      },
    },
    logoUrl:{
      type:String,
      value:'',
    },
    city:{
      type:String
    }
  },
  data: {
    navH: "",
    city:''
  },
  ready: function(){
    this.setClass();
    var pages = getCurrentPages();
    if (pages.length <= 1) this.setData({'parameter.return':0});
  },
  attached: function () {
    this.setData({
      navH: app.globalData.navHeight
    });
  },
  methods: {
    onCitySelect(){
      wx.navigateTo({ url: `/pages/switchcity/switchcity` });
    },
    return:function(){
      let pages = getCurrentPages();
      if (pages['1'].route.indexOf('pages/resume_') !== -1) {
        // console.log('存在')
        wx.showModal({
          title: '温馨提示',
          content: '退出后编辑内容不保存',
          success (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              });
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      } else {
        wx.navigateBack({
          delta: 1
        });
      }
     
      // console.log('点击了返回')
      // var pages = getCurrentPages();
      // wx.navigateBack({
      //   delta: pages.length-2
      // });
    },
    setGoodsSearch:function(){
       wx.navigateTo({
         url: '/pages/goods_search/index',
       })
    },
    setClass:function(){
      var color = '';
      switch (this.data.parameter.class) {
        case "0": case 'on':
          color = 'on'
          break;
        case '1': case 'black':
          color = 'black'
          break;
        case '2': case 'gray':
          color = 'gray'
          break;
        case '3': case "red":
          color = 'red'
          break;
        case '4': case "gradual01":
          color = 'gradual01'
          break;
        default:
          break;
      }
      this.setData({
        'parameter.class': color
      })
    }
  }
})