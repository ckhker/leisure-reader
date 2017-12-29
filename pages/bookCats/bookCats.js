// pages/bookCats/bookCats.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [
      {
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    minorList: []
  },

  getIndexBooks: function (gender,type,major,minor,start){
    wx.request({
      url: api.getCatsBooks(gender,type,major,minor,start),
      success: res => {
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.major,
    });
    wx.getStorage({
      key: 'minor',
      success: res => {
        let data = res.data[options.gender];
        for (let i = 0;i < data.length; i++) {
          if (data[i].major === options.major) {
            this.setData({
              minorList: data[i].mins 
            });
          }
        }
      },
    });
    this.getIndexBooks(options.gender,'hot',options.major,'',0);
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