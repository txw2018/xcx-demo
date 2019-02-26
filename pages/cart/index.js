// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray:[],
    totalMoney:"0.00",
    totalCount:0,
    selectAll:false,
    startX:0,//开始坐标
    startY:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onGetCount(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    cartArray[index].total = e.detail.val;
    this.setData({
      cartArray
    })
  },
  switchGoodDetail(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    wx.navigateTo({
      url: '/pages/detail/index?id=' + cartArray[index].id,
    })


  },
  selectGood(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    //合计和数量
    let totalMoney = Number(this.data.totalMoney);
    let totalCount = this.data.totalCount;
    //选中状态
    let selectAll = this.data.selectAll;
    cartArray[index].select = !cartArray[index].select;
    if (cartArray[index].select){
      totalMoney+=Number(cartArray[index].price)*cartArray[index].total;
      totalCount++
    }else{
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total;
      totalCount--;
      selectAll = false
    }
    this.setData({
      cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount,
      selectAll
    })
    console.log(this.data.totalMoney)

  },
  addCount(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    let totalMoney = Number(this.data.totalMoney);
    // 计算金额
    if (cartArray[index].select) {
      totalMoney += Number(cartArray[index].price) * cartArray[index].total;
     
    }
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })

  },
  subCount(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    let totalMoney = Number(this.data.totalMoney);
    // 计算金额
    if (cartArray[index].select){
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total;
  

    }
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })

  },
  selectAll(){
    const cartArray = this.data.cartArray;
    let totalMoney = 0;
    let totalCount = 0;
    let selectAll = this.data.selectAll;
    selectAll = !selectAll;
    cartArray.forEach(cart =>{
      cart.select = selectAll;
      //计算总金额和个数
      if(cart.select){
        totalMoney += Number(cart.price) * cart.total;
        totalCount++;
      }else{
        totalMoney = 0;
        totalCount = 0;
      }
    })
    this.setData({
      cartArray,
      totalMoney,
      totalCount,
      selectAll
    })
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
     const _this = this;
     wx.getStorage({
       key: 'cartInfo',
       success(res) {
         console.log(res)
         let cartArray = res.data;
         cartArray.forEach(cart => {
           cart.select = false;//全都不选中
           cart.isTouchMove = false;//是否滑动

         })
         _this.setData({
           cartArray: cartArray,
           selectAll:false,
           totalMoney:"0.00",
           totalCount:0
         })
         
         console.log(cartArray)
         //设置tabbar图标
         cartArray.length > 0 ?
         wx.setTabBarBadge({
           index:2,
           text:String(cartArray.length)
         }) : wx.removeTabBarBadge({
           index: 2,
         })
       },
     })
  },
  touchstart(e){
    console.log(e)
    //开始触摸时
    let cartArray = this.data.cartArray;
    cartArray.forEach(cart => {
      if(cart.isTouchMove){
        cart.isTouchMove = false;
      }
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      cartArray
    })

  },
  touchmove(e){
    const index = e.currentTarget.dataset.index;
    //开始x，y
    var startX = this.data.startX;
    var startY = this.data.startY;
    //移动的X和y
    var touchMoveX = e.changedTouches[0].clientX;
    var touchMoveY = e.changedTouches[0].clientY;
    console.log(touchMoveX)
    //调用角度计算 获取角度
    var angel = this.angel({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    //遍历数组中的所有对象
    this.data.cartArray.forEach((cart,i) => {
      cart.isTouchMove =false;
      //滑动的角度>30 直接return
      if(Math.abs(angel)>30) return;
      //匹配
      if(i == index){
        if(touchMoveX>startX){//右滑
          cart.isTouchMove = false
        }else{
          cart.isTouchMove =true;
        }
      }
    })
    //更新数据
    this.setData({
      cartArray:this.data.cartArray
    })


  },
  angel(start,end){
    var _X = end.X - start.X;
    var _Y = end.Y - start.Y;
    //返回角度 Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y/_X)/(2*Math.PI);


  },
  del(e){
    const _this = this;
    const index = e.currentTarget.dataset.index
    wx.getStorage({
      key: 'cartInfo',
      success(res) {
        let partData = res.data;
        partData.forEach((cart,i) => {
          if(cart.title == _this.data.cartArray[index].title){
            partData.splice(i,1)
          }
        })
        wx.setStorage({
          key: 'cartInfo',
          data: partData,
        })
        //更新数据
        _this.update(index)
      },
    })
  },
  update(index){
    let cartArray = this.data.cartArray;
    let totalMoeny = Number(this.data.totalMoeny);
    let totalCount = this.data.totalCount;

    //计算价格和数量
    if(cartArray[index].select){
      totalMoeny -= Number(cartArray[index].price) * cartArray[index].total
      totalCount --

    }
    //删除
    cartArray.splice(index,1)
    this.setData({
      cartArray,
      totalMoeny: String(totalMoeny.toFixed(2)),
      totalCount
    })
    //设置tabber
    cartArray.length>0?
    wx.setTabBarBadge({
      index: 2,
      text: String(cartArray.length),
    }) : wx.removeTabBarBadge({
      index: 2,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //页面离开时
    const cartArray = this.data.cartArray;
    wx.setStorage({
      key: 'cartInfo',
      data: cartArray,
    })

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})