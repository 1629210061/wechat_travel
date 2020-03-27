//app.js

App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  
  },
  globalData: {
    server_data_interface: "http://localhost:8080/attraction",
    url:"http://localhost:8080/",
    hascode:false,
    session_key:null,
    openid:null,

  },

})