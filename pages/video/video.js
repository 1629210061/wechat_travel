// pages/video/viedo.js
Page({


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      videourl:options.url
    })
    console.log(this.data.videourl)
  },

 
})