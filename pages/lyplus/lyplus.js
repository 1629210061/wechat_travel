//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    logoid: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: ['http://47.100.19.206/images/1.jpg',
      'http://47.100.19.206/images/2.jpg',
      'http://47.100.19.206/images/3.jpg'
    ],
    logos1: [{
      image: "/images/mudidi.png",
      title: "地域文化",
      id: "7"
    }, {
      image: "/images/route.png",
      title: "旅游线路",
      id: "11"
    }, {
      image: "/images/gonglue.png",
      title: "旅游攻略",
      id: "12"
    }],

    logos2: [{
      image: "/images/logo6.png",
      title: "酒店预订",
      id: "5"
    }, {
      image: "/images/logo5.png",
      title: "预订导游",
      id: "6"
    }, {
      image: "/images/njl.png",
      title: "农家乐",
      id: "10"
    }],

    logos3: [{
        image: "/images/tc.png",
        title: "特产购买",
        id: "8"
      }, {
        image: "/images/car.png",
        title: "租车",
        id: "9"
      }, {
        image: "/images/food.png",
        title: "寻美食",
        id: "3"
      }

    ],


  },

  onLoad: function(options) {


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

})