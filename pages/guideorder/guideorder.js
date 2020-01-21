var app = getApp()
var url = getApp().globalData.url

Page( { 
  data: {

    addrIndex:0,
    date : '',
    starttime : '12:00',
    endtime:'12:00',
    bookToastHidden:true
  },
  onLoad: function (options) {

    // 获取当前时间
    console.log(wx.getStorageSync('guide'))
    this.setData({
      guide: wx.getStorageSync('guide')
    })
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
      startdate: Y + '-' + M + '-' + D,
      enddate: Y + '-' + M + '-' + D
    })   
  },
  bindinput:function(e){
    var that = this
    var value = e.detail.value
    that.setData({
      message: value
    })
  },
  getname: function (e) {
    var that = this
    var value = e.detail.value
    that.setData({
      ordername: value
    })
  },
  gettel: function (e) {
    var that = this
    var value = e.detail.value
    that.setData({
      tel: value
    })
  },
  bindToastTap:function(){
    var that = this
    wx.request({
      url: url +'order/addGuideBook',
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        time:this.data.nowdate,
        name:this.data.guide.name,
        tel:this.data.tel,
        starttime:this.data.startdate+"  "+this.data.starttime,
        endtime:this.data.enddate+"  "+this.data.endtime,
        ordername:this.data.ordername,
        message:this.data.message,
      },
      success: function (res) {
        that.setData({
          bookToastHidden: false
        })
        wx.navigateTo({
          url: '../guide/guide',
        })
      },
    })
     
  },
  hideToast:function(){
    this.setData({
          bookToastHidden:true
      })
  },
  // 日期选择
  bindDateChange1: function(e){
    console.log('date picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        startdate: e.detail.value
    })
  },
  // 日期选择
  bindDateChange2: function (e) {
    console.log('date picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },
  // 时间选择
  bindTimeChange1: function(e){
    console.log('time picker发送选择改变，携带值为', e.detail.value)
    this.setData({
          starttime: e.detail.value
    })
  },
  // 时间选择
  bindTimeChange2: function (e) {
    console.log('time picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endtime: e.detail.value
    })
  }
  
})