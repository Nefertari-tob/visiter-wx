//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showDialog: false,
    password:"",
    account:"",
    // msg:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // var that = this
    const userurl = app.globalData.userurl
    const ba = app.globalData.userunionId11
    console.log("132",ba)
    if(ba == null){
      this.setData({photo : ""})
    }else{
      if(ba.picture == null){
        this.setData({photo : ""})
      }else{
        this.setData({photo:userurl + ba.picture})
      }
    }
    this.setData({
      msg: ba,
      userurl:userurl,
    })
    this.axiosvivitor()
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true,
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    // console.log(this.data.userInfo)
  },
  axiosvivitor(){
    // console.log(co)
    console.log(123)
    console.log(this.data)
    if( this.data.msg == null){
      this.setData({
        showDialog: false
      })
      }else(
        this.setData({
          showDialog: false,
        })
      )
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onCancel1: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  tapOneDialogButton(){
    wx.navigateTo({
      url: '../approval/approval',
    })
  },
  accountInput:function(e){
    this.setData({
      account:e.detail.value
    })
    this.account = e.detail.value
  },
  passwordInput:function(e){
    this.setData({
      idcard:e.detail.value
    })
    this.password = e.detail.value
  },
  // inputCode: function(e) {
  //   let pwd = e.detail.value
  //   return pwd.replace(/[^a-zA-Z]/g,'')
  // },
  toggleDialog() {
    var that = this
      var co = app.globalData.useraccountId
      var userurl = this.data.userurl
      var phone = that.account
      if(phone.length != 11){
        wx.showToast({
          title: "电话号码不正确",
          icon: 'none',
          duration: 1500
        })
      }else{
      wx.request({
        url: `${userurl}information/addTeacher`,
        method: 'POST',
        header:{
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data:{
          accountId : co,
          password : that.password,
          phone  :that.account
        },
        success: res=>{
          console.log(res.data)
          const title = res.data.msg
          wx.showToast({
            title: title,
            icon: 'none',
            duration: 2000
          })
          if(res.data.msg == "操作成功"){
            this.setData({
              showDialog: !this.data.showDialog
            });
          }
          this.setData({
            msg: res.data.data,
          })
        }
      })
    }
    // this.setData({
    //   showDialog: !this.data.showDialog
    // });
    // console.log(this.name)
  },
  //头像核验
  chooseimage: function() {
    var that = this;
    var userurl = this.data.userurl
    var id = this.data.msg.id
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function(res) {
        var path = res.tempFilePaths[0]
        that.path = path
        // console.log(path)
        // wx.uploadFile({
        //   url: `${userurl}user/check`,
        //   filePath: path,
        //   method: 'POST',
        //   name: 'rootImage',
        //   // formData:{
        //   //   rootImage:path
        //   // },
        //   success: function (res) {
        //     // console.log(res.data)
        //     var data = JSON.parse(res.data)
        //     that.code = data.code
        //     // console.log(data.code)
        //     if(data.code==0){
              // console.log(res.data.code)
              wx.uploadFile({
                url: `${userurl}information/updateTeacher`,
                filePath: that.path,
                method: 'POST',
                name: 'picture ',
                formData:{
                  teacherId : id
                },
                success(res){
                  console.log(res.data)
                  that.setData({
                    photo: path,
                  })
                  wx.showToast({
                    title: '图片上传成功',
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
            // }
            // else{
            //   wx.showModal({
            //     title: data.msg,
            //     content: '请重新上传',
            //     success(res) {
            //       if (res.confirm) {
            //         console.log('用户点击确定')
            //         that.setData({
            //           photo: '',
            //         })
            //       } else if (res.cancel) {
            //         console.log('用户点击取消')
            //         wx.navigateTo({
            //           url: '../admin/admin'
            //         })
            //       }
            //     }
            //   })
            // }
          // }
        // })
      }
    })
  },
})
