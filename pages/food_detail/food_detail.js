
var app = getApp();
var url = app.globalData.url

Page({
  data: {

   
  },
  onLoad: function(options) {

    var that = this
    wx.request({
      url: url +'food/findById',
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
          food: res.data,
          comment:res.data.comment.split("&"),
          detail_pic:res.data.detail_pic.split('&&'),
          recommend:res.data.recommend.split('&&'),
          recommend_pic:res.data.recommend_pic.split('&&')

        })
      }
    })
   
  },
  previewImg: function (e) {
    wx.previewImage({ 
      current: this.data.detail_pic[0], //当前图片地址
      urls: this.data.detail_pic, //所有要预览的图片的地址集合 数组形式 
      success: function(res) {

      }, 

    }) 
  }


})