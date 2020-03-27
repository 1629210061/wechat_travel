// pages/place/place.js

var url = getApp().globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 景点介绍显示行数
    line_clamp: 4,
    // 景点介绍展示全部和收起文字
    introduce_button_text: '展示全部',
    currentTab: 0,
    amount: 1,
    startdate: '2019-04-19',
    enddate: '2019-12-12',
    selectdate: '2019-04-19',
    showcomment: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var lb_images;

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
      cn_name: options.cn_name,

      nowdate: Y + '-' + M + '-' + D,
    });
    console.log(options.cn_name),
      //获取景点
      wx.request({
        url: getApp().globalData.server_data_interface + "/findByName",
        method: 'GET',
        header: {
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: {
          cn_name: that.data.cn_name,
        },
        success: function(res) {
          console.log(res.data)
          that.setData({
            attractions: res.data,
            eg_name: res.data.eg_name,
            address: res.data.address,
            lb_pictures: res.data.lb_pictures.split("&"),
            dt_pictures: res.data.dt_pictures.split("&"),
            introduce: res.data.introduce,
            telephone: res.data.telephone,
            open_time: res.data.open_time,
            level: res.data.level,
            ticket: res.data.ticket,
            traffic: res.data.traffic,
            traffic_pic: res.data.traffic_pic.split("&"),
            ticket_price: res.data.ticket_price,
            longitude: res.data.longitude,
            latitude: res.data.latitude

          })
          console.log(that.data.latitude)

        }
      })

    //浏览记录
    wx.request({
      url: url + 'user/updateRecord',
      method: 'PUT',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        cn_name: that.data.cn_name,
        openid: wx.getStorageSync('openid'),
      },
      success: function(res) {
        console.log(res.data)
      }
    })

    this.getcomment();

  },

  // 景点介绍展示全部
  showAll: function() {
    if (this.data.line_clamp == 4) {
      this.setData({
        line_clamp: 0,
        introduce_button_text: '收起'
      })

    } else {
      this.setData({
        line_clamp: 4,
        introduce_button_text: '显示全部'
      })
    }
  },
  getcomment: function() {

    var that = this
    //评论
    wx.request({
      url: url + 'comment/findByName',
      method: 'GET',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        name: that.data.cn_name,
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          comments: res.data

        })
      }
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
  //评论
  comment: function() {
    this.setData({
      showcomment: true
    })
  },
  closemodal: function() {
    this.setData({
      showcomment: false
    })
    console.log(this.data.showcomment)
  },




  bindinput: function(e) {
    console.log(e.detail.value)
    this.setData({
      concent: e.detail.value,
    })
  },
  post: function() {
    var that = this
    wx.request({
      url: url + 'comment/addComment',
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        comm_name: this.data.cn_name,
        nickname: wx.getStorageSync('nickname'),
        avatraurl: wx.getStorageSync('avatarurl'),
        content: this.data.concent,
      },
      success: function(res) {
        console.log(res.data)
        if (res.data == 1) {
          that.getcomment();
        }

      }

    })

    this.setData({
      showcomment: false
    })
  },

  bindDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      selectdate: e.detail.value
    })

  },

  /**
   * 提交订单
   */
  submit: function() {
    var that = this;

    that.setData({
      ticketcode: Math.random().toString(36).substr(2, 15)
    })
    wx.request({
      url: url + 'order/addOrder',
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },

      data: {

        openid: wx.getStorageSync('openid'),
        time: this.data.nowdate,
        limited: this.data.selectdate,
        amount: this.data.amount,
        name: this.data.cn_name,
        price: this.data.ticket_price,
        ticketcode: this.data.ticketcode,
        picurl: this.data.dt_pictures[0],
        ordertype: 'scene',
      },
      success: function(res) {
        
        console.log(res.data)
        if (res.data == 1) {
          wx.showToast({
            title: '购买成功，请前往我的订单查看', //提示文字
            icon: 'none',
            duration: 2000, //显示时长
          })
          that.hideSpecMenu()
        }
        
      }
    })

  },
  //收藏
  collect: function() {
    var that = this;

    wx.request({
      url: url + 'collect/addCollect',
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },

      data: {
        openid: wx.getStorageSync('openid'),
        name: this.data.cn_name,
      },
      success: function(res) {
        console.log(res.data)
        if (res.data == 1) {
          wx.showToast({
            title: '收藏成功', //提示文字
            icon: 'none',
            duration: 2000, //显示时长
          })
        } else {
          wx.showToast({
            title: '已收藏该景点', //提示文字
            icon: 'none',
            duration: 2000, //显示时长
          })
        }
      }

    })

  },

  click: function(e) {
    let cn_name = this.data.cn_name;
    let address = this.data.address;
    wx.openLocation({
      latitude: this.data.latitude * 1,
      longitude: this.data.longitude * 1,
      scale: 18,
      name: cn_name,
      address: address
    })
  },
  //厕所信息
  gotomap: function() {
    wx.navigateTo({
      url: '../map/map',
    })
  },
  gotoparking: function() {
    WX: wx.navigateTo({
      url: '../parking/parking',

    })
  },
  inputFocus(e) {

    var inputHeight = 10
    if (e.detail.height) {
      inputHeight = e.detail.height
    }
    console.log(inputHeight)
    this.setData({
      bottom: inputHeight
    })

    console.log(e.detail.height, '键盘弹起')
  },
  inputBlur() {
    console.log('键盘收起')
    this.setData({
      bottom: 10
    })
  },
  panorama: function() {
    wx.navigateTo({
      url: '../panorama/panorama',
    })
  },
  gotovideo: function() {
    console.log(this.data.attractions.video_url)
    wx.navigateTo({
      url: '../video/video?url=' + this.data.attractions.video_url,
    })
  },


})