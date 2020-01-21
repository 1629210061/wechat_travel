/**
 * 直播
 */

Page({
  data: {
    playurl: 'http://play.ourpeace.top/live/0517.flv',
    liveDirection: ''
  },
  onReady(res) {
    this.ctx = wx.createLivePlayerContext('player')
  },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  fullscreenchange(e) {
    console.log('live-player direction:', e.detail.direction),
      console.log('live-player fullScreen:', e.detail.fullScreen)
    wx: if (e.detail.direction == "horizontal" && e.detail.fullScreen != true) {
      this.setData({
        liveDirection: "vertical"
      });
    }
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  bindPlay() {
    this.ctx.play({
      success: res => {
        console.log('play success')
      },
      fail: res => {
        console.log('play fail')
      }
    })
  },
  bindPause() {
    this.ctx.pause({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  },
  bindStop() {
    this.ctx.stop({
      success: res => {
        console.log('stop success')
      },
      fail: res => {
        console.log('stop fail')
      }
    })
  },
  bindResume() {
    this.ctx.resume({
      success: res => {
        console.log('resume success')
        this.setData({
          liveDirection: "vertical"
        });
      },
      fail: res => {
        console.log('resume fail')
      }
    })
  },
  bindMute() {
    this.ctx.mute({
      success: res => {
        console.log('mute success')
      },
      fail: res => {
        console.log('mute fail')
      }
    })
  },
  bindFullScreen() {
    this.ctx.requestFullScreen({
      success: res => {
        console.log('play success'),
          this.setData({
            liveDirection: "horizontal"
          });
      },
      fail: res => {
        console.log('play fail')
      }
    })
  }

})