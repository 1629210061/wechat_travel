Page({
  data: {
    markers: [{
      iconPath: '/images/other.png',
      id: 0,
      latitude: 30.2253630000,
      longitude: 120.1250680000,
      width: 30,
      height: 30
    }, {
        iconPath: '/images/other.png',
        id: 1,
        latitude: 30.2253630000,
        longitude: 120.1240680000,
        width: 30,
        height: 30
      },
    
    
    
    ],
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   }, {
    //     longitude: 193.324520,
    //     latitude: 23.21229
    //   }],
    //   color: '#FF0000DD',
    //   width: 2,
    //   dottedLine: true
    // }],
    controls: [{
      id: 1,
      iconPath: '/images/loc.png',
      position: {
        left: 0,
        top: 20,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  onLoad(){
    this.mapCtx = wx.createMapContext('map');
  },
  includePoints() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 30.2253630000,
        longitude: 120.1250680000,
      }, {
          latitude: 30.2253630000,
          longitude: 120.1240680000,
      }]
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
    if (e.controlId==1){
      this.includePoints() 
    }
  }
})