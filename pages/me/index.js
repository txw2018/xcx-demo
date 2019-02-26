//获取应用实例
const app = getApp();

// pages/me/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:false,
    canIUse:wx.canIUse("button.open-type.getUserInfo")

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
    if(app.globalData.userInfo){
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:true
      })
    }else if(this.data.canIUse){
      //由于getUserInfo是网络请求,可能在onload之后c才返回，
      //为了防止z这种情况发生,所以此处加入callback
      app.userInfoReadyCallback = res =>{
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      }
    }

  },
  //实现获取用户信息的方法
  getUserInfo:function(e){
    console.log(e)
    this.setData({
      userInfo:e.detail.userInfo,
      hasUserInfo:true

    })
       
  }


})