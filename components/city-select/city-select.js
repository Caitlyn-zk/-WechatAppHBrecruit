
const app = getApp();
Component({
  properties: {
    cityGroup:{
      type:Object,
      value:[],
    },
    hotCityList:{
      type:Object,
      value:[],
    },
    cityId:{
      type:String
    }
  },
  data: {
    letterData:['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'],
    navH: 0,
    height:0
  },
  attached: function () {
    this.setData({
      navH: app.globalData.navHeight,
      height: wx.getSystemInfoSync().windowHeight
    });
  },
  methods: {
    onSelect: function(e){
      // console.log(e)
      this.triggerEvent('select',e.currentTarget.dataset);
    },
    onClose:function (e){
      this.triggerEvent('close');
    }
  }
})