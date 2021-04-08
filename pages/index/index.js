//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    showDialog: false,
    account:"",
    name:"",
    idCard:"",
    path:"",
    code:"",
    userurl:""
    // msg:[],
  },
  onLoad: function() {
    var cor = app.globalData.userunionId11
    const userurl = app.globalData.userurl
    // console.log(cor)
    this.setData({
      msg : cor,
      userurl: userurl
    })
    this.axiosvivitor()
  },
  axiosvivitor(){
    // console.log(123)
    // console.log(this.data)
    if( this.data.msg == null){
      this.setData({
        showDialog: false
      })
      }else{
        this.setData({
          showDialog: false,
          // msg:cor,
          userurl:this.data.userurl+this.data.msg.picture,
        })
      }
  },
  onCancel1: function () {
    // this.setData({
    //   showDialog: !this.data.showDialog
    // });
    wx.navigateTo({
      url: '../login/login'
    })
  },
  tapOneDialogButton(){
    wx.navigateTo({
      url: '../appoint/appoint',
    })
  },
  appointment(){
    wx.navigateTo({
      url: '../record/record',
    })
  },
  chooseimage: function() {
    var that = this;
    var userurl = this.data.userurl
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function(res) {
        var path = res.tempFilePaths[0]
        that.path = path
        // console.log(path)
        that.setData({
          photo: path,
        })
        wx.uploadFile({
          url: `${userurl}user/check`,
          filePath: path,
          method: 'POST',
          name: 'rootImage',
          // formData:{
          //   rootImage:path
          // },
          success: function (res) {
            // console.log(res.data)
            var data = JSON.parse(res.data)
            that.code = data.code
            // console.log(data.code)
            if(data.code==0){
              // console.log(res.data.code)
              wx.showToast({
                title: '图片上传成功 请进行下一步',
                icon: 'none',
                duration: 2000
              })
            }
            // else{
            //   wx.showToast({
            //     title: data.msg,
            //     icon: 'none',
            //     duration: 2000
            //   })
            // }
            else{
              wx.showModal({
                title: data.msg,
                content: '请重新上传',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    that.setData({
                      photo: '',
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    wx.navigateTo({
                      url: '../index/index'
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  nameInput:function(e){
    this.setData({
      name:e.detail.value,
    })
    this.name = e.detail.value
  },
  accountInput:function(e){
    this.setData({
      account:e.detail.value
    })
    this.account = e.detail.value
  },
  idcardInput:function(e){
    this.setData({
      idcard:e.detail.value
    })
    this.idCard = e.detail.value
  },
  // inputCode: function(e) {
  //   let pwd = e.detail.value
  //   this.account = pwd
  //   console.log(this.account)
  //   // return pwd.replace(/[^a-zA-Z]/g,'')
  // },
    toggleDialog() {
    var that = this;
    var co = app.globalData.useraccountId
    var userurl = this.data.userurl
    if(that.code==0){
      var pho = that.account
      var card = that.idCard
      let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
     if(pho.length != 11){
        wx.showToast({
          title: "电话号码不正确",
          icon: 'none',
          duration: 1500
        })
      }else if(reg.test(card) == false){
        wx.showToast({
          title: '身份证号码有误',
          icon: 'none',
          duration: 1500
        })
      }else{
      // console.log(that.path)
      wx.uploadFile({
        url: `${userurl}information/addVisitor`,
        filePath: that.path,
        method: 'POST',
        name: 'picture',
        formData:{
          accountId : co,        
          idCard  : that.idCard,
          name : that.name,
          phone  : that.account
        },
        success: res => {
          // console.log(res.data)
          var data = JSON.parse(res.data)
          // app.globalData.systemmsg = data.data
          var pictu = data.data.picture
          app.globalData.userunionId11 = data.data
          // that.msg = data.data
          console.log(pictu)
          this.setData({
            msg: data.data,
            // userurl: this.data.userurl + this.data.msg.picture,
            userurl: this.data.userurl+ pictu
          })
        }
      }),
      this.setData({
        showDialog: !this.data.showDialog
      });
    }
    }else{
      wx.showToast({
        title: "请上传正确的照片",
        icon: 'none',
        duration: 2000
      })
    }
  },
  
})
