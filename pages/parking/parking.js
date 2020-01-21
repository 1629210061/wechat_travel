// pages/parking/parking.js

var app = getApp()
Page({
  data: {
    markers: [{
      iconPath: "/images/other.png",
      id: 0,
      latitude: 30.2252930000,
      longitude: 120.1240680000,
      width: 30,
      height: 30,
    },  {
        iconPath: "/images/other.png",
        id: 1,
        latitude: 30.2253430000,
        longitude: 120.1250280000,
        width: 30,
        height: 30,
    }, {
        iconPath: "/images/other.png",
      id: 2,
        latitude: 30.2253470000,
        longitude: 120.1250980000,
        width: 30,
        height: 30,
    }],
    polyline: [{
      points: [{
        longitude: 102.6569366455,
        latitude: 25.0821785206
      }, {
        longitude: 102.6569366455,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/images/loc.png',
      position: {
        left: 10,
        top: 10,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },
  onLoad: function (e) {
    this.mapCtx = wx.createMapContext('map');
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
    
  },
  controltap(e) {
    console.log(e.controlId)
    if (e.controlId == 1) {
      this.includePoints()
    }
  },
  includePoints() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 30.2253630000,
        longitude: 120.1250680000,
      }, {
          latitude: 30.2253430000,
          longitude: 120.1250780000,
      }, {
          latitude: 30.2253470000,
          longitude: 120.1250980000,
      }
      ]
    })
  },

  openParkingMap: function () {
    wx.openLocation({
      latitude: 30.2253630000,
      longitude: 120.1250680000,
      scale: 18,
      name: '海屯路超市停车场',
    })

  }
})
