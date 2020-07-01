import {workType,mainSalary} from '../../config/constant.js'
const app = getApp();
Component({
  properties: {
    item:{
      type:Object,
      value:[],
    },
  },
  data: {
    workType:workType,
    salary: mainSalary
  },
  attached: function () {
  },
  
  methods: {
    
  },

})