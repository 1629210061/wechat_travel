//answer.js

var app = getApp();
var url = app.globalData.url
Page({
  data: {

  },
  //事件处理函数
  onLoad: function (options) {
    console.log(options.id)
    var that = this
 
    wx.request({
      url: url + 'strategy/findById',
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
          strategy: res.data
        })
        var imgurls = that.data.imgurl.split(",");
        that.setData({
          imgurls:imgurls
        })
      }
    })
  },


    

})
