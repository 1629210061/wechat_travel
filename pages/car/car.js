//method.js

var app = getApp()
var url = app.globalData.url

Page({
  data: {

  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: url+'car/findAll',
      method: 'GET',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },

      success: function (res) {
        console.log(res.data);
        that.setData({
          cars: res.data
        })

      }
    })
  },
  // 跳转至详情页
  navigateDetail: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../carDetail/carDetail?id=' + id
    })
  }
})