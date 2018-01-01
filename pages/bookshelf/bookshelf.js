//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js');
Page({
  data: {
    STATIC_HOST: '',
    userInfo: {},
    bookShelfData: [],
    bookShelfCount: 0
  },
  //事件处理函数
  bindViewTap: function() {
   
  },
  getShelfInfo: function() {
    wx.getStorage({    //获取书架信息
      key: 'bookShelfData',
      success: res => {
        this.setData({
          STATIC_HOST: api.STATIC_HOST,
          bookShelfData: res.data,
          bookShelfCount: res.data.length
        });
      },
      fail: function () {
        wx.setStorage({
          key: 'bookShelfData',
          data: [],
        })
      }
    })
  },
  onLoad: function () {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    });
    this.getShelfInfo();
  }
})