// pages/orderManage/orderDeatail.js


const QRCode = require('../../utils/weapp-qrcode.js')
import rpx2px from '../../utils/rpx2px.js'
let qrcode;

// 300rpx 在6s上为 150px
const qrcodeWidth = rpx2px(300)
var url = getApp().globalData.url
Page({
  data:{
    orderNum: 123456789,
    image: '',
    // 用于设置wxml里canvas的width和height样式
    qrcodeWidth: qrcodeWidth,
    imgsrc: ''
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    console.log(options.id)
    wx.setNavigationBarTitle({
        title: '订单详情'
    })

    wx.request({
      url: url +'order/findById',
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
          order:res.data,
          ticketcode:res.data.ticketcode
        })

        qrcode = new QRCode('canvas', {
          usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
          width: qrcodeWidth,
          height: qrcodeWidth,
          colorDark: "#000",
          colorLight: "white",
          correctLevel: QRCode.CorrectLevel.H,
        });

        // 生成图片，绘制完成后调用回调
        qrcode.makeCode(that.data.ticketcode, () => {
          // 回调
          qrcode.exportImage(function (path) {
            that.setData({
              imgsrc: path
            })
            console.log(path)
          })
        })
      }
    })

   

    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})