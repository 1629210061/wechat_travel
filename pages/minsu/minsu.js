//index.js
//获取应用实例
var app = getApp()
var url = app.globalData.url

Page({
  data: {
    list: [],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,

    swiperurl: [{imgurl:url+'images/minsu/kcj/1.jpg',title:'开茶节',id:'7'},
      {imgurl:url+'images/minsu/ysqq/1.jpg',title:'尧山秋千',id:'8'},
      {imgurl:url+'images/minsu/qxymsshl/1.jpg', title:'九姓渔民水上婚礼',id:'9'}
    ],

    plain: false
  },
  //事件处理函数
  bindViewTap: function(e) {
    wx.navigateTo({
      url: '../newsdetail/newsdetail?id=' + e.target.dataset.id
    })
  },

  onLoad: function () {
    var that = this
    wx.request({
      url: url + 'article/findByType',
      method: 'GET',
      data: {
        type: '4'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          minsu: res.data,
        })
      }
    })
   
    
  }
})
