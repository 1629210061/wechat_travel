// pages/destination/destination.js
Page({
 
  onLoad: function (options) {
    var that = this;
    console.log(options.type);
    
  if(options.type=='city'){
    that.setData({
      city: options.city
    })
    wx.request({
      url: getApp().globalData.server_data_interface+'/findByArea',
      method: 'GET',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        area: that.data.city,
        url: getApp().globalData.url
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          allview: res.data,
          length: res.data.length
        })

        console.log(that.data.allview.length)

      }
    })
  }
  else{
    that.setData({
      category: options.category
    })
    wx.request({
      url: getApp().globalData.server_data_interface +'/findByCategory',
      method: 'GET',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        category: that.data.category,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          allview: res.data,
          length: res.data.length
        })

      }
    })
  }
    

  },

  activeClick(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      active: index
    })
  },
  // 进入景点详情
  enterDetail(e) {
    let cn_name = e.currentTarget.dataset.cnname;
    wx.navigateTo({
      url: '../introduce/introduce?cn_name=' + cn_name
    })
  },

  getname:function(e){
    var that = this;
    that.setData({
      cn_name:e.detail.value
    })
    console.log(that.data.cn_name)
    wx.request({
      url: getApp().globalData.server_data_interface +'/findByAreaAndName',
      method: 'GET',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      data: {
        area: that.data.city,
        cn_name: that.data.cn_name,
      },
      success: function (res) {
        that.setData({
          allview: res.data,
          length: res.data.length
        })


      }
    })
  }


})