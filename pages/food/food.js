
let app = getApp()
var url = app.globalData.url

Page({
  data: {
    posts_key: [],
    nearbydatas: ['由近到远','由远到近'],
    fooddatas: ['全部', "自助餐", "湖北菜", "川菜", "湘菜", "粤菜", "咖啡厅", "小龙虾", "火锅", "海鲜", "烧烤", "江浙菜", "西餐", "料理", "其它美食"],
    sortingdatas: ['全部','人气排序'],
    page: 1,
    isclosure:false,
    isScroll: true,
    ismodel: false,
    isnearby: false,
    isfood: false,
    issorting: false,
  },

  onLoad: function (options) {

    this.getData();
   
  },
  onShow: function () {
    this.setData({
      isclosure: true
    })
  },

  getData: function () {
    var that = this
    wx.request({
      url: url+'food/findAll',
      method: 'GET',

      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          foods: res.data,



        })

      }
    })
  },
  onInputText: function (e) { //获取搜索框内的值
    this.setData({
      key:e.detail.value
    })
    console.log(this.data.key)
  
  },
  onSearchInp:function(){
    var that = this
    wx.request({
      url: url +'food/findByName',
      method: 'GET',
      data: {
        key:this.data.key,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          foods: res.data,
        })

      }
    })
  },
  

  //点击列表跳转详情
  onTouchItem: function (event) {
    wx.navigateTo({
      url: '../food_detail/food_detail?id=' + event.currentTarget.id,
    })
  },
  onReachBottom: function () {  //用户上拉触底加载更多

  },
  onPullDownRefresh: function () {


  },


  // 模态框 start
  openmodel: function (e) {  //打开模态框
    let id = e.currentTarget.id
    this.setData({
      ismodel: true,
      isScroll: false
    })
    if (id == 1) {
      this.setData({
        isnearby: true
      })
    } else if (id == 2) {
      this.setData({
        isfood: true
      })
    } else if (id == 3) {
      this.setData({
        issorting: true
      })
    }
  },
  closemodel: function () {  //关闭模态框
    this.setData({
      ismodel: false,
      isnearby: false,
      isfood: false,
      issorting: false,
      isScroll: true
    })
  },
  nearby: function () {  //附近
    console.log("nearby")
    this.setData({
      isnearby: true,
      isfood: false,
      issorting: false
    })
  },
  goodfood: function () {  //美食
    console.log("goodfood")
    this.setData({
      isnearby: false,
      isfood: true,
      issorting: false
    })
  },
  sorting: function () {   //综合排序
    console.log("sorting")
    this.setData({
      isnearby: false,
      isfood: false,
      issorting: true
    })
  },
  clicknearby: function (ev) { //附近之一
    let id = ev.currentTarget.id, _data = this.data.nearbydatas, _value = '';
    for (let i = 0; i < _data.length; i++) {
      if (id == i) {
        _value = _data[i]
      }
    }
    this.setData({
      businessCate: '',
      browSort: '',
      posts_key: [],
      isclosure: true,
      page: 1
    })
    this.closemodel();
    this.getData();
    
  },
  clickfood: function (ev) { //美食之一
    let id = ev.currentTarget.id
    let _data = this.data.fooddatas
    let _value = ''
    for (let i = 0; i < _data.length; i++) {
      if (id == i) {
        _value = _data[i]
      }
    }
    if (id == 0) {
      _value = ''
    }
    this.setData({
      isclosure: true,
      businessCate: _value,
      posts_key: [],
      page:1
    })
    this.closemodel()
    this.getData()
  },
  clicksorting: function (ev) { //综合排序之一
    let id = ev.currentTarget.id
    let _data = this.data.sortingdatas;
    let _value = ''
    for (let i = 0; i < _data.length; i++) {
      if (id == i) {
        _value = _data[i]
      }
    }
    if (id == 0) {
      this.setData({
        browSort: '',
        isclosure: true,
        posts_key: [],
        page: 1
      })
    }else{
      this.setData({
        browSort: '2',
        posts_key: []
      })
    }
    this.closemodel()
    this.getData()
  }

  //模态框 end
})