// components/infocell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:''
    },
    desc:{
      type:String,
      value:''
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    popView:function(){
      console.log(123);
      this.triggerEvent("popView")
    }
  }
})
