
//获取应用实例
var app = getApp()
var url = app.globalData.url
Page({
  data: {
    

    
  },
  onLoad: function () {
   
    var that = this;

    wx.request({
      url: url +'article/findByType',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        type: "3"
      },
      success: function (res) {
        
        that.setData({
          stories: res.data
        })
        console.log(that.data.stories)
      }
    })

  },

  

})
