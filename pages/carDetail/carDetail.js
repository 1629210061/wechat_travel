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
    day: 1,
    checkInDate: '点击选择日期',
    checkOutDate: '点击选择日期',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var pic;
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


    this.setData({
      nowdate: Y + '-' + M + '-' + D,
    });
    
    wx.request({
      url: url + 'car/findById',
      method: 'GET',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        id: options.id,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          car: res.data,
          pic: res.data.fm_images
        })
      },
    })
    console.log(pic)
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

  onShow: function () {
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      checkInDate: getDate.checkInDate,
      checkOutDate: getDate.checkOutDate,
    })

    //转成毫秒数，两个日期相减
    var outday = new Date(this.data.checkOutDate)
    var inday = new Date(this.data.checkInDate)
    if (outday && inday) {
      var days = outday.getTime() - inday.getTime();
      //转换成天数
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      //do something
      this.setData({
        day: day
      })
    } else {
      this.setData({
        day: 0
      })
    }
  },

  checkDate: function (startTime, endTime) {
    //日期格式化
    var start_date = new Date(startTime.replace(/-/g, "/"));
    var end_date = new Date(endTime.replace(/-/g, "/"));
    //转成毫秒数，两个日期相减
    var days = end_date.getTime() - start_date.getTime();
    //转换成天数
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    //do something
    console.log("day = ", day);
  },

  /**
   * 购买
   */
  buy: function () {
    this.showSpecMenu()
  },
  showSpecMenu: function () {
    this.setData({
      showSpecMenu: true,
    })
  },
  hideSpecMenu: function () {
    this.setData({
      showSpecMenu: false,
    })
  },

  // 购买房数数量增减
  add: function () {
    this.setData({
      amount: this.data.amount + 1
    })
  },
  sub: function () {
    if (this.data.amount > 1) {
      this.setData({
        amount: this.data.amount - 1
      })
    }

  },

  navigateData: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../calendar/calendar'
    })
  },

  collect: function () {
    wx.showToast({
      title: '该功能暂未开发', //提示文字
      icon: 'none',
      duration: 2000, //显示时长

    })
  },
  submit: function () {
    var that = this;

    that.setData({
      ticketcode: Math.random().toString(36).substr(2, 15)

    })
    wx.request({
      url: url+'order/addOrder',
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },

      data: {
        openid: wx.getStorageSync('openid'),
        time: this.data.nowdate,
        limited: this.data.checkInDate + '至' + this.data.checkOutDate,
        amount: this.data.amount,
        name: this.data.car.name,
        price: this.data.car.unit_price * this.data.day * this.data.amount,
        ticketcode: this.data.ticketcode,
        picurl: this.data.car.fm_images,
        ordertype: 'car',
      },
      success: function (res) {
        console.log(res.data)
        if (res.data == 1) {
          wx.showToast({
            title: '预约成功，请前往我的订单查看',//提示文字
            icon: 'none',
            duration: 2000,//显示时长
          })
        }
      }
    })

  }


})