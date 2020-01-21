// pages/newstdetail/newsdetail.js
const url = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: url + 'article/findById',
      method: 'GET',
      data: {
        id:options.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data,
          picurl:res.data.picurl.split("&")
        })
      }
    })

  },


})