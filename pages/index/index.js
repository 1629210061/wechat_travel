//index.js
//获取应用实例
const golbal = getApp().globalData;

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    logoid: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgs: [{
        url: golbal.url + 'images/1.jpg',
        title: '西湖美景，邀你来看'
      },
      {
        url: golbal.url + 'images/2.jpg',
        title: '冬去春来，带上家人来踏青吧'
      }, 
      {
        url: golbal.url + 'images/3.jpg',
        title: '放松自己，来一场说走就走的旅行'
      }
      
    ],
    logos1: [{
      image: "/images/logo1.png",
      title: "地区选择",
      id: "2"
    }, {
      image: "/images/logo3.png",
      title: "扫一扫",
      id: "1"
    }, {
      image: "/images/logo4.png",
      title: "分类",
      id: "4"
    }],
  },

  onLoad: function(options) {
    var that = this;

    wx.request({
      url: 'http://localhost:8080/attraction/random',
      method: 'get',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        that.setData({
          attras: res.data
        })
        console.log(that.data.attras)

      }

    })

  },
  getUserInfo: function(e) {
    console.log(e)
    golbal.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 点击logo跳转

  onItdcClick: function(event) {
    var that = this;

    var type = event.currentTarget.dataset.logoType;
    console.log(type)
    if (type == 3) {
      wx.navigateTo({
        url: '../food/food'
      });
    } else if (type == 2) {
      wx.navigateTo({
        url: '../city/city'
      });
    } else if (type == 1) {
      that.onQRClick();
    } else if (type == 4) {
      wx.navigateTo({
        url: '../classily/classily'
      });
    } else if (type == 5) {
      wx.navigateTo({
        url: '../hotel/hotel'
      });
    } else if (type == 6) {
      wx.navigateTo({
        url: '../guide/guide'
      });
    } else if (type == 7) {
      wx.navigateTo({
        url: '../tripdst/tripdst'
      });
    } else if (type == 8) {
      wx.navigateTo({
        url: '../specialtylist/specialtylist'
      });
    } else if (type == 9) {
      wx.navigateTo({
        url: '../car/car'
      });
    } else if (type == 10) {
      wx.navigateTo({
        url: '../agritainment/agritainment'
      });
    } else if (type == 11) {
      wx.navigateTo({
        url: '../route/route'
      });
    } else if (type == 12) {
      wx.navigateTo({
        url: '../method/method'
      });
    }

  },
  // 扫描
  onQRClick: function() {
    var that = this;
    wx.scanCode({
      success: (res) => {
        this.getDataFromServer(res.result); //传送解析出的二维码内容，获取商品id

      }
    })
  },
  getDataFromServer: function(scanResult) {
    var that = this;
    wx.request({
      url: golbal.server_data_interface + "/findByName",
      method: 'GET',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        cn_name: scanResult,
      },
      success: function(res) {
        if (res.data.id == null) { //二维码格式不符合规则
          wx.showToast({
            title: '二维码格式错误，请确保是GoodsKeeper官方二维码', //提示文字
            icon: 'none',
            duration: 2000, //显示时长

          })
        } else { //格式正确
          wx.showToast({
            title: '扫码成功', //提示文字
            icon: 'success',
            duration: 2000, //显示时长

          })
          setTimeout(function() {
            wx.navigateTo({
              url: '../introduce/introduce?cn_name=' + scanResult
            })
          }, 2000)

        }
      },
      fail: function() {
        that.show("请检查网络连接", 1500);
      }
    })
  },
  enterDetail(e) {
    let cn_name = e.currentTarget.dataset.cnname;
    wx.navigateTo({
      url: '../introduce/introduce?cn_name=' + cn_name
    })
  },

})