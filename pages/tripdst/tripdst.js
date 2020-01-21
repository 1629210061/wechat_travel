// pages/tripdst/tripdst.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },
  news:function(){
    wx.navigateTo({
      url: '../newlist/newlist'
    });

  },
  situation:function(){
    wx.navigateTo({
      url: '../situation/situation'
    });
  },
  story:function(){
    wx.navigateTo({
      url: '../story/story'
    });
  },
  minsu:function(){
    wx.navigateTo({
      url: '../minsu/minsu'
    });
  },
  yanchu:function(){
    wx.navigateTo({
      url: '../yanchu/yanchu'
    });
  },


})