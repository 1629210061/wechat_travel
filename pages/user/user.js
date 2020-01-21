var app = getApp()
var url = app.globalData.url

Page({
  data: {
    userInfo: "",
    canIUse: true,
    alive:true
  },

  onLoad: function () {
    var that = this
    if (wx.getStorageSync('userInfo')){
      that.setData({
        canIUse:false
      })
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    console.log(this.data.userInfo.avatarUrl)
 
    }
  },
  orders: function () {
    var that = this;
      wx.request({
        url: url +'user/findByOpenid',
        method: 'GET',
        header: {
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: {
          openid: wx.getStorageSync('openid'),
        },
        success: function (res) {
          console.log(res.data.id)
          that.setData({
            userid: res.data.id
          })
          wx.navigateTo({
            url: '../order/order?userid=' + that.data.userid
          })
        }
      })
  },

  collects:function(){
    var that = this;
    wx.request({
      url: url + 'user/findByOpenid',
      method: 'GET',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        openid: wx.getStorageSync('openid'),
      },
      success: function (res) {
        that.setData({
          userid: res.data.id
        })
        wx.navigateTo({
          url: '../collect/collect?userid=' + that.data.userid
        })
      }
    })
  },
  question:function(){
    wx.navigateTo({
      url: '../question/question'
    })
  },
  youhuijuan:function(){
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  },
  

  undo: function () {
    wx.showToast({
      title: '暂时未开发此功能',//提示文字
      icon: 'none',
      duration: 2000,//显示时长

    })
  },

  bindGetUserInfo(e) {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: url + 'user/getOpenid',
          data: {
            code: res.code,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            wx.setStorageSync('openid', res.data.openid);
            wx.setStorageSync('session_key', res.data.session_key);

            //添加用户信息
            wx.request({
              url: url + 'user/addUser',
              method: 'POST',
              data: {
                openid: wx.getStorageSync('openid'),
                session_key: wx.getStorageSync('session_key'),
                avatarurl: that.data.userInfo.avatarUrl,
                nickname: that.data.userInfo.nickName,
                city: that.data.userInfo.city,
                country: that.data.userInfo.country,
                gender: that.data.userInfo.gender,
                language: that.data.userInfo.language,
                province: that.data.userInfo.province

              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {

              }
            })

          }
        })


      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.us
              // erInfo = res.userInfo
              wx.setStorageSync('userInfo', res.userInfo)
              wx.setStorageSync('avatarurl', res.userInfo.avatarUrl)
              wx.setStorageSync('nickname', res.userInfo.nickName)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)

              }
            }
          })
        }
      }
    })

    that.setData({
      userInfo: e.detail.userInfo,
      canIUse:false
    })

    
    
  },

})