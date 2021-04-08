Page({
    data: {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      isHide: false
  },
  onLoad: function () {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.login({
                success: res => {
                  console.log("用户的code:" + res.code);
                }
                
              });
            }
          });
        } else {

          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      var that = this;
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      wx.navigateTo({
        url: '../index/index',
      })
      that.setData({
        isHide:false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

    accessdenied: function () {
      
    },
   

})

  

