// pages/strategypost.js

var app = getApp()
var url = app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteMaxLen: 2000, // 最多放多少字
    title: "",
    content:"",
    noteNowLen: 0,//备注当前字数
    imageList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 监听字数
  bindTextAreaChange1: function (e) {
    var that = this
    var value = e.detail.value
    that.setData({ 
      title: value
    })
    

  },

  bindTextAreaChange2: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({
       content: value, 
       noteNowLen: len 
      })

  },
  // 提交清空当前值
  bindSubmit: function () { 
    var that = this;
    wx.request({
      url: url + 'strategy/addStrategy',
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        openid:wx.getStorageSync('openid'),
        imgurl:that.data.imageList,
        title:that.data.title,
        content:that.data.content,
        nickname:wx.getStorageSync('nickname'),
        avatarurl:wx.getStorageSync('avatarurl'),
      },
      success: function (res) {
        if(res.data==1){
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1500,
            mask: false,
            success: function () {
              that.setData({
                content: '',
                title: '',
                noteNowLen: 0,
                // imageList:[]
              })
            }
          })

        }
        
      }
    })


    setTimeout(function () {
    wx.switchTab({
        url: '../method/method',
        success: function (e) 
        { 
          var page = getCurrentPages().pop();
          if (page == undefined || page == null) return; 
          page.onLoad(); 
        } 

      })
    }, 2000)

  },
  chooseImage: function (event) {
    var that = this;
    wx.chooseImage({
      count: 5, // 一次最多可以选择2张图片一起上传
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgeList = that.data.imageList.concat(res.tempFilePaths);
        that.setData({
          imageList: imgeList
        });
        console.log(that.data.imageList)
      }
    })
  },
  previewImage: function (e) {
    var that = this;
    var dataid = e.currentTarget.dataset.id;
    var imageList = that.data.imageList;
    wx.previewImage({
      current: imageList[dataid],
      urls: this.data.imageList
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})