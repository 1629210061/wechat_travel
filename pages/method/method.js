//method.js


var app = getApp();
var url = app.globalData.url
Page({
  data: {

  },
  //事件处理函数
  bindItemTap: function(e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../method_into/method_into?id=' + e.currentTarget.dataset.id
    })
  },
  upper: function() {
    wx.showNavigationBarLoading()
    this.refresh();
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },
  refresh: function() {
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 2000
    })
  },
  onLoad: function() {
    var that = this
    that.getAll()

  },

  getAll:function(){
    var that = this
    wx.request({
      url: url + 'strategy/findAll',
      method: 'GET',
      data: {
        type: 'getallstratrgy'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          strategies: res.data
        })
      }
    })
  },

  add: function() {
    wx.navigateTo({
      url: '../strategypost/strategypost',
    })
  },

  //下拉刷新
  onPullDownRefresh: function() {
    var that = this;
    that.getAll()
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },


})