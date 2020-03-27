

//获取应用实例
var app = getApp()
var url = app.globalData.url
Page({
  data: {
    carousel:[
      'http://img4.imgtn.bdimg.com/it/u=3872536443,3984057083&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4159282448,172343000&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=869692484,1119455781&fm=26&gp=0.jpg'

    ]
  },
  onLoad: function () {

    var that = this;

    wx.request({
      url: url +'specialty/findAll',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {

        that.setData({
          specialties: res.data
        })
      }
    })

  },
 


})
