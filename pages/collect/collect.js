// pages/collect/collect.js
var url = getApp().globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collects:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userid: options.userid
    })
    this.getcollect()
  },

  getcollect:function(){
    var that = this
    wx.request({
      url: url +'collect/findByUserId',
      method: 'GET',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        userid: that.data.userid,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          collects: res.data,
        })
      }
    })
  },
  // 进入景点详情
  enterDetail(e) {
    let cn_name = e.currentTarget.dataset.cnname;
    console.log(e.currentTarget.dataset.cnname)
    wx.navigateTo({
      url: '../introduce/introduce?cn_name=' + cn_name
    })
  },
  
  //删除
  deletecollect:function(e){
    var that = this;
    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.request({
      url: url +'collect/delCollect',
      method: 'DELETE',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        id:id,
      },
      success: function (res) {
        that.getcollect()
      }
    })
  },
 

})