
var app = getApp()
var url = app.globalData.url

Page( {
  data: {
  },
  onLoad: function (options) { 
    console.log(options.id)
    var that = this
    wx.request({
      url: url + 'guide/findById',
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
          guide: res.data,
        })
        wx.setStorage({
          key: 'guide',
          data: that.data.guide,
        })
      }
    })
  },
  // 预定
  bookTap:function(){
    wx.navigateTo({
      url:'../guideorder/guideorder?'
    })
  }
})