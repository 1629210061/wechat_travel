var app = getApp()
var url = app.globalData.url
Page({
  data: {
    routers: [
      {
        category: '寺庙',
        icon: url+'images/category/sm.jpg'
      },
      {
        category: '历史建筑',
        icon: url +'images/category/lsjz.jpg'
      },
      {
        category: '博物馆',
        icon: url +'images/category/bwg.jpg'
      },
      {
        category: '美术馆',
        icon: url +'images/category/msg.jpg'
      },
      {
        category: '公园',
        icon: url +'images/category/gy.jpg'
      },
      {
        category: '动植物园',
        icon: url +'images/category/dzwy.jpg'
      },
      {
        category: '自然景观',
        icon: url +'images/category/zrjg2.jpg'
      },
      {
        category: '早期产业旧址',
        icon: url +'images/category/zqcyjz.jpg'
      },
      {
        category: '花园',
        icon: url +'images/category/hy.jpg'
      }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  },
  enterDetail(e) {
    let category = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: '../destination/destination?category=' + category + '&type=' +'category'
    })
  },
})

