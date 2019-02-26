const interfaces = require('../../utils/urlconfig.js')
// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     prolist:[],
     page:1,
     size:5,
     noData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      wx.setNavigationBarTitle({
        title: options.title,
      })
      wx.showLoading({
        title: '加载中...',
      })
      const _this = this;
      wx.request({
        url: interfaces.productionsList,
        success(res){
          console.log(res.data)
          _this.setData({
            prolist:res.data
          })
          wx.hideLoading()
        }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

    //显示加载状态
    wx.showNavigationBarLoading();
    this.setData({
      page:1,
      noData:false
    })
    const _this = this;
    wx.request({
      url: interfaces.productionsList,
      success(res) {
        _this.setData({
          prolist: res.data
        })
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //停止下拉刷新
    wx.stopPullDownRefresh();

    wx.showNavigationBarLoading();
    const prolist = this.data.prolist;
    let page = this.data.page;
    this.setData({
      page:++page
    })
    const _this = this;
    wx.request({
      url: interfaces.productionsList+'/'+_this.data.page+'/'+_this.data.size,
      success(res){
        console.log(res)
        if(res.data.length == 0){
          _this.setData({
            noData:true
          })
        }else{
          res.data.forEach(item => {
            prolist.push(item)
          })
          _this.setData({
            prolist: prolist
          })
        }
       
        //隐藏加载状态
        wx.hideNavigationBarLoading();
      }
    })

  },
  switchProlistDetail(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/index?id=' + this.data.prolist[index].id,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})