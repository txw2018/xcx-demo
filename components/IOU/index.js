// components/IOU/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBaitiao:{
      type:Boolean,
      value:true
    },
    baitiao:{
      type:Array
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    selectIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    makeBaitiao(){
      console.log(this.properties.baitiao)

    },
    hideBaitiaoView(e){
      console.log(e)
      if(e.target.dataset.target == "self"){
        this.setData({
          hideBaitiao: false
        })
      }
    },
    selectItem(e){
      let index = e.currentTarget.dataset.index;
      let baitiao = this.data.baitiao
      baitiao.forEach(item => {
        item.select = false;
      })
      baitiao[index].select = !baitiao[index].select;
      this.setData({
        baitiao,
        selectIndex:index
      })
    },
    makeBaitiao(){
      this.setData({
        hideBaitiao: true
      })
      const selectItem = this.data.baitiao[this.data.selectIndex];
      //事件传递
      this.triggerEvent("updateSelect", selectItem)


    }


  }
})
