/*technician.js*/

//获取应用实例
var app = getApp()
var url = app.globalData.url

Page({
  // 页面初始数据
  data: {
      // nav 初始化
      // cas picker
      casArray: ['美发','美容','美甲','美睫'],
      casIndex:0,
      // addr picker
      addrIndex:0,
      curNavId: 1,
		  curIndex: 0
  },
   
  onLoad:function(){
    var that = this
    wx.request({
      url: url+'guide/findAll',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          guides: res.data,
        })
      }
    })
   
  },
  // 跳转至详情页
  navigateDetail: function(e){
    wx.navigateTo({
      url:'../guide_detail/guide_detail?id=' + e.currentTarget.dataset.id
    })
  },
  // 类别选择
  bindCasPickerChange:function(e){
    console.log('Category picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      casIndex: e.detail.value
    })
  },
  

  
})
