// pages/bookCity/bookCity.js
const api = require('../../utils/api.js')

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    majorList: {}
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //获取一级分类及数目 
  getCats: function () {
    wx.request({
      url: api.classification.getCats,
      success: (res) => {
        this.setData({
          majorList: res.data
        });
      }
    })
  },
  //获取二级分类
  getMinor: function () {
    wx.request({
      url: api.classification.getMinor,
      success: function (res) {
        wx.hideLoading();
        wx.setStorage({
          key: 'minor',
          data: res.data,
        })
      }
    });
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getCats();
    this.getMinor();
    //  高度自适应
    wx.getSystemInfo({
      success: (res) => {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        this.setData({
          winHeight: calc
        });
      }
    });
  }
})