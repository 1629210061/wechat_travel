// pages/destination/destination.js
Page({

  onLoad: function (options) {
    var that = this;
    that.setData({
      
    })
    wx.request({
      url: getApp().globalData.server_data_interface,
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        openid:wx.getStorageSync("openid"),
        type: 'recommend'
      },
      success: function (res) {
       
       that.setData({
         allview:res.data.params.recommends,
         length: res.data.params.recommends.length
       })
        console.log(that.data.allview)
      }
    })

  },

  activeClick(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      active: index
    })
  },
  // 进入景点详情
  enterDetail(e) {
    let cn_name = e.currentTarget.dataset.cnname;
    wx.navigateTo({
      url: '../introduce/introduce?cn_name=' + cn_name
    })
  },

  getname: function (e) {
    var that = this;
    that.setData({
      cn_name: e.detail.value
    })
    console.log(that.data.cn_name)
    wx.request({
      url: getApp().globalData.server_data_interface,
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        area: that.data.city,
        cn_name: that.data.cn_name,
        type: 'aserach'
      },
      success: function (res) {
        console.log(res.data.params.attractions)
        that.setData({
          allview: res.data.params.attractions,
          length: res.data.params.attractions.length
        })

        console.log(that.data.allview)

      }
    })
  }


})