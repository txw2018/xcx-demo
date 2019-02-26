const interfaces = require("../../utils/urlconfig.js")
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems:[],
    navRightItems:[],
    curIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: interfaces.productions,
      header: {
        "content-type": "application/json"
      },
      success(res){
          _this.setData({
            navLeftItems: res.data.navLeftItems,
            navRightItems: res.data.navRightItems,
          })
          wx.hideLoading();
      }
    })
  },


  switchRightTab:function(e){
    console.log(e.currentTarget.dataset.index)
    let index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex:index
    })
  },
  showListView(e){
    console.log(e.currentTarget.dataset.txt)
    let txt = e.currentTarget.dataset.txt;
    wx.navigateTo({
      url: '/pages/list/index?title='+txt,
    })
  }

})