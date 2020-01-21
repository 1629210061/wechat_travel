const url = getApp().globalData.url;
Page({
  data: {
    list: {}
  },
  onReady: function () {

  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: url +'article/findByType',
      method: 'GET',
      data: {
        type: '1'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list:res.data,        
       
        })
     
      }
    })
  }
})
