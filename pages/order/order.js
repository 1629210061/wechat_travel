/*order.js*/

//获取应用实例
var app = getApp()
var url = app.globalData.url
Page({
  // 页面初始数据
  data: {
    // nav 初始化
    // cas picker
    navTab: ["未消费", "待付款", "待评价", "退款"],
    currentNavtab: 0,
  },

  onLoad: function(options) {
    var that = this
    that.setData({
      userid: options.userid
    })
    wx.request({
      url: url+'order/findAllOrder',
      method: 'GET',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        userid: that.data.userid,
      },
      success: function(res) {
        that.setData({
          orders: res.data,
        })
      }
    })

    // wx.request({
    //   url: getApp().globalData.server_data_interface,
    //   method: 'POST',
    //   header: {
    //     "Content-Type": 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     userid: that.data.userid,
    //     type: 'ischeck'
    //   },
    //   success: function (res) {
    //     that.setData({
    //       ischeck: res.data.params.orders,
    //     })
    //   }
    // })

    


  },


  // 跳转至详情页
  navigateDetail: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.aid;
    console.log(id)
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id=' + id
    })
  },


  switchTab: function(e) {
    console.log(e.currentTarget.dataset.idx)
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    console.log(this.data.currentNavtab)
  }
})