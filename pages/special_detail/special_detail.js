// pages/goods/goods.js
var app = getApp()
var url = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,

    showSpecMenu:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id)
    var that = this;

    wx.request({
      url: url + 'specialty/findById',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id:options.id,
      },
      success: function (res) {

        that.setData({
          specialty: res.data,
          lb_pic:res.data.lb_pic.split('&&'),
          detail_pic:res.data.detail_pic.split('&&')
        })
        console.log(that.data.specialty)
        console.log(that.data.specialty.parameter)
      }
    })

   
  },
  /** 
   * 点击tab切换 
   */
  tab: function (e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 加入购物车
   */
  addCart:function(){
   
  },
  copyText:function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})