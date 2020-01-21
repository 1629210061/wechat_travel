
//获取应用实例
var app = getApp()
var url = app.globalData.url
Page({
  data: {

  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: url + 'article/findByType',
      method: 'GET',
      data: {
        type: '5'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          yanchu: res.data
        })

      }
    })

  },
  //下拉刷新
  onPullDownRefresh: function () {
    console.log("下拉刷新");
    
  },

})
