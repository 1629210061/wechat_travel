// pages/place/place.js

var app = getApp()
var url = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    showSpecMenu: false,


    amount: 1,
    startdate: '2019-04-19',
    enddate: '2019-12-12',
    selectdate: '2019-04-19',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var lb_images;
    console.log(options.id)
    // 获取当前时间
    let timestamp = Date.parse(new Date());
    let date = new Date(timestamp);
    //获取年份  
    let Y = date.getFullYear();
    //获取月份  
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    wx.request({
      url: url + 'agritainment/findById',
      method: 'GET',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        id: options.id,
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          agritainment: res.data,
          lb_images: res.data.lb_images.split("&"),
          dt_images: res.data.dt_images.split("&")
        })
      },
    })
  },
  /** 
   * 点击tab切换 
   */
  tab: function(e) {
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
   * 购买
   */
  buy: function() {
    this.showSpecMenu()
  },
  showSpecMenu: function() {
    this.setData({
      showSpecMenu: true,
    })
  },
  hideSpecMenu: function() {
    this.setData({
      showSpecMenu: false,
    })
  },
  // 购买门票数量增减
  add: function() {
    this.setData({
      amount: this.data.amount + 1
    })
  },
  sub: function() {
    if (this.data.amount > 1) {
      this.setData({
        amount: this.data.amount - 1
      })
    }
  },

  bindDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      selectdate: e.detail.value
    })
  },

  submit: function() {
    // var that = this;

    // that.setData({
    //   ticketcode: Math.random().toString(36).substr(2, 15)
    // })
    // wx.request({
    //   url: getApp().globalData.server_data_interface,
    //   method: 'POST',
    //   header: {
    //     "Content-Type": 'application/x-www-form-urlencoded'
    //   },

    //   data: {
    //     openid: wx.getStorageSync('openid'),
    //     time: this.data.nowdate,
    //     limited: this.data.selectdate,
    //     amount: this.data.amount,
    //     name: this.data.name,
    //     price: this.data.price,
    //     ticketcode: this.data.ticketcode,
    //     type: 'addorder'
    //   },
    //   success: function(res) {
    //     console.log(res.data)
    //     if (res.data.params.res == "success") {
    //       wx.showToast({
    //         title: '购买成功，请前往我的订单查看', //提示文字
    //         icon: 'none',
    //         duration: 2000, //显示时长
    //       })
    //     }
    //   }
    // })
  },


  click: function (e) {
    let name = this.data.agritainment.name;
    let address = this.data.agritainment.address;
    let latitude = this.data.agritainment.latitude;
    let longitude = this.data.agritainment.longitude;
    wx.openLocation({
      latitude: latitude * 1,
      longitude: longitude * 1,
      scale: 18,
      name: name,
      address: address
    })
  }
})