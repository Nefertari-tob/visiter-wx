//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    //小程序分享
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

           
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //消息推送
  // subscribebutton(){
  //   var message = 'XrCc4bpaq3Cbo8eKm1GTHACYnHrnxBSBpUbbXeY9l0k'
  //   wx.requestSubscribeMessage({
  //     tmplIds: [message],
  //     success: (res)=> {
  //         if (res[message] == 'accept'){
  //             //用户允许
  //         }
  //     },
  //     fail: (res)=> { console.info(res) },
  // })
  // },
  globalData: {
    userunionId11: null,
    // userunionId22: null,
    useraccountId:null,
    // userurl:"https://wx.kamtewog.com/vapi/",
    userurl:"http://192.168.1.13:8818/",
    // userurl:"https://www.njga.cn/vapi/",
    // userurl:"http://192.168.1.136:8818/",
    // userurl:"http://192.168.1.18:8818/",
    userInfo:null,
    userteachId:null
  }
})