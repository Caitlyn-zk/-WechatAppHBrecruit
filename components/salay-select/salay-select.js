
const app = getApp();
Component({
  properties: {
    salaryData:{
      type:Object,
      value:[],
    },
    salaryId:{
      type:Number
    }
  },
  data: {
    navH: 0,
  },
  attached: function () {
    this.setData({
      navH: app.globalData.navHeight
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