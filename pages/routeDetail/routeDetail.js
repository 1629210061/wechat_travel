// pages/place/place.js

var app = getApp()
var url = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var pic;
    var introduce;
    var soute;
    wx.request({
      url: url + 'route/findById',
      method: 'GET',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        id: options.id,
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          route: res.data,
          pic: res.data.pic.split("&"),
          introduce: res.data.introduce.split("&&"),
          route1: res.data.route.split("&&"),

        })


      },

    })

  }
})