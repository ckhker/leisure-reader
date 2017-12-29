// pages/details/details.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */

  data: {
    STATIC_HOST: '',
    bookInfo: {},
    book_rate: 2 //书籍评分
  },

  getBookInfo: function (book_id) {
    wx.request({
      url: api.book.bookInfo(book_id),
      success: res => {
        wx.hideLoading();
        this.setData({
          bookInfo: res.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    this.setData({
      STATIC_HOST: api.STATIC_HOST
    });
    this.getBookInfo(options.book_id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
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