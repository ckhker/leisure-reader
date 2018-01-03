//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js');
Page({
  data: {
    STATIC_HOST: '',
    userInfo: {},
    bookShelfData: [],
    bookShelfCount: 0,
    hasUpdate: []
  },
  getlasterChapter: function () {
    for (let i = 0; i < this.data.bookShelfData.length; i++) {
      wx.request({
        url: api.book.bookChaptersBookId(this.data.bookShelfData[i].bookInfo.id),
        success: res => {
          wx.hideLoading();
          //如果有更新就将最近更新的时间刷新进去，初次与加入书架时比较
          if (Date.parse(this.data.bookShelfData[i].bookInfo.laterChapter) + 60 * 60 * 24 <= Date.parse(res.data.mixToc.chaptersUpdated)) {
            this.data.bookShelfData[i].bookInfo.laterChapter = res.data.mixToc.chaptersUpdated;
            wx.setStorage({
              key: 'bookShelfData',
              data: this.data.bookShelfData,
            })
            this.data.hasUpdate[i] = 1;
            this.setData({
              hasUpdate: this.data.hasUpdate
            });
          }
        }
      })
    }
    wx.hideLoading();
  },
  getShelfInfo: function () {
    wx.getStorage({    //获取书架信息
      key: 'bookShelfData',
      success: res => {
        this.setData({
          STATIC_HOST: api.STATIC_HOST,
          bookShelfData: res.data,
          bookShelfCount: res.data.length,
        });
        for (let i = 0;i < res.data.length; i++) {
          this.data.hasUpdate.push(0);   //用数组表示是否有更新, 1 有 0 无
          this.setData({
            hasUpdate: this.data.hasUpdate
          });
        }
        this.getlasterChapter();
      },
      fail: function () {
        wx.hideLoading();
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
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    this.setData({
      hasUpdate: []
    });
    this.getShelfInfo();
  }
})