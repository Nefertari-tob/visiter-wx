const app = getApp();
Page({
  data: {
      //判断小程序的API，回调，参数，组件等是否在当前版本可用。
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      isHide: false,
      accountId:null,
      userurl:""
  },

  onLoad: function() {
    const userurl = app.globalData.userurl
    this.setData({userurl:userurl})
      // var that = this;
      // that.userurl=userurl
      // wx.showLoading({
      //   title: '加载中...',
      //   mask: true
      // })
  },
  showlogin(type = 1){
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    var userurl = this.data.userurl
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
          if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                  success: function(res) {
                    // wx.showLoading({
                    //   title: '加载中...',
                    //   mask: true
                    // })
                      // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                      // 根据自己的需求有其他操作再补充
                      // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                      wx.login({
                        success: res => {
                            // 获取到用户的 code 之后：res.code
                            console.log("用户的code:" + res.code);
                            // 可以传给后台，再经过解析获取用户的 openid
                            // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                            // var userurl = this.data.userurl
                            wx.request({
                                // 自行补上自己的 APPID 和 SECRET
                                url:`${userurl}account/wx`,
                                  method:'POST',
                                  header:{
                                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                                  },
                                  data:{
                                    code : res.code
                                  },
                                success: res => {
                                    // 获取到用户的 openid
                                    console.log("用户的openid:" + res.data.data);
                                    wx.request({
                                      url: `${userurl}account/addAccount`,
                                      method:'POST',
                                      header:{
                                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                                      },
                                      data:{
                                        openId : res.data.data
                                      },
                                      success: res => {
                                          // console.log(res.data)
                                          that.accountId=res.data.data.id
                                          console.log(that.accountId)
                                          app.globalData.useraccountId = res.data.data.id;
                                          //查询信息
                                          wx.request({
                                            url: `${userurl}information/getInformation`,
                                            method:'GET',
                                            header:{
                                              'content-type':'application/json'
                                            },
                                            data:{
                                              accountId :that.accountId,
                                              type: type
                                            },
                                            success(res) {
                                              console.log(res.data);
                                              app.globalData.userunionId11 = res.data.data;
                                              const co = app.globalData.userunionId11
                                              console.log(co)
                                              if(type == 0){
                                                wx.navigateTo({
                                                  url: '../indadd/indadd'
                                                })
                                              }else if(type == 1){
                                                wx.navigateTo({
                                                  url: '../admin/admin'
                                                })
                                              }
                                            },
                                      
                                          })
                                      },
                                      fail(){},
                                      complete(){
                                        wx.hideLoading()
                                      }
                                    })
                                }
                            });
                        }
                    });
                  }
              });
          } else {
            // this.bindGetUserInfo()
              // 用户没有授权
              // 改变 isHide 的值，显示授权页面
              wx.hideLoading()
              that.setData({
                  isHide: true
              });
              // this.bindGetUserInfo()
          }
      },
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
  bindGetUserInfo: function(e) {
      if (e.detail.userInfo) {
          //用户按了允许授权按钮
          var that = this;
          // 获取到用户的信息了，打印到控制台上看下
          console.log("用户的信息如下：");
          console.log(e.detail.userInfo);
          //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
          that.setData({
              isHide: false
          });
          if(this.data.type == 0){
            this.visitorButton()
          }else if(this.data.type == 1){
            this.adminButton()
          }
          // this.showlogin()
      } else {
          //用户按了拒绝按钮
          wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
              showCancel: false,
              confirmText: '返回授权',
              success: function(res) {
                  // 用户没有授权成功，不需要改变 isHide 的值
                  if (res.confirm) {
                      console.log('用户点击了“返回授权”');
                  }
              }
          });
      }
  },
  bindNotUserInfo(){
    wx.navigateTo({
      url: '../login/login'
    })
  },
  visitorButton(){
    const type = 0
    this.showlogin(type)
    this.setData({type : type})
      // var that = this;
      // var userurl = this.data.userurl

      // wx.navigateTo({
      //   url: '../index/index'
      // })
  },
  adminButton(){
    const type = 1
    this.showlogin(type)
    this.setData({type : type})
    // var that = this;
    // var userurl = this.data.userurl
    //   wx.request({
    //     url: `${userurl}information/getInformation`,
    //     method:'GET',
    //     header:{
    //       'content-type':'application/json'
    //     },
    //     data:{
    //       accountId :that.accountId,
    //       type: 1
    //     },
    //     success(res) {
    //       // console.log(res.data);
    //       app.globalData.userunionId22 = res.data.data;
    //       // var userurl = 'http://192.168.1.110:8818/information/getInformation'
    //       // app.globalData.userurl = userurl;
    //       const ba = app.globalData.userunionId22
    //       console.log(ba)
    //       wx.navigateTo({
    //         url: '../admin/admin'
    //       })
    //     },
  
    //   })

  },
})