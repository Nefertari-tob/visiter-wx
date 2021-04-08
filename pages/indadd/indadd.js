//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    showDialog: false,
    showchild:false,
    bodaybox:[],
    startX:0,
    startY:0,
    account:"",
    name:"",
    idCard:"",
    chiCard:"",
    path:"",
    code:"",
    chimes:[],
    userurl:"",
    array:[{name:"父亲"},{name:"母亲"}],
    index:0
    // msg:[],
  },
  onLoad: function() {
    var cor = app.globalData.userunionId11
    const userurl = app.globalData.userurl
    console.log(cor,"111")
    // this.setData({
    //   msg : cor,
    //   userurl: userurl
    // })
    // this.axiosvivitor()
    //左滑删除
    isTouchMove: false
    // for (var i = 0; i < 2; i++) {
    //   this.data.bodaybox.push({
    //     content: i + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
    //     isTouchMove: false //默认全隐藏删除
    //   })
    // }
    this.setData({
      // bodaybox: this.data.bodaybox,
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
        showDialog: true
      })
      }else{
        this.setData({
          showDialog: false,
          // msg:cor,
          // userurl:this.data.userurl+this.data.msg.picture,
        })
      this.studentmes()
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
  //预约记录
  tapOneDialogButton(){
    wx.navigateTo({
      url: '../appoint/appoint',
    })
  },
  //访客预约
  appointment(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  //信息管理
  childmessage(){
    wx.navigateTo({
      url: '../childmsg/childmsg',
    })
  },
  //选择照片
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
        //       // console.log(res.data.code)
        //       wx.showToast({
        //         title: '图片上传成功 请进行下一步',
        //         icon: 'none',
        //         duration: 2000
        //       })
        //     }
        //     else{
        //       wx.showModal({
        //         title: data.msg,
        //         content: '请重新上传',
        //         success(res) {
        //           if (res.confirm) {
        //             console.log('用户点击确定')
        //             that.setData({
        //               photo: '',
        //             })
        //           } else if (res.cancel) {
        //             console.log('用户点击取消')
        //             wx.navigateTo({
        //               url: '../index/index'
        //             })
        //           }
        //         }
        //       })
        //     }
        //   }
        // })
      }
    })
  },
  //访客登录信息
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
  //学生身份证号
  chiidcardInput(e){
    this.setData({
      chicard:e.detail.value
    })
    this.chiCard = e.detail.value
    
  },
  //家长身份
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value
    })
    // let appellation = this.data.array[ this.data.index].name
    this.index = e.detail.value
    // console.log(appellation);
    
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
    // if(that.code==0){
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
          this.studentmes()
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
            // userurl: this.data.userurl+ pictu
          })
        }
      }),
      this.setData({
        showDialog: !this.data.showDialog
      });
    }
    // }else{
    //   wx.showToast({
    //     title: "请上传正确的照片",
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
  },
  //关联学生弹窗
  associatestudents(){
    this.setData({
      showchild: true
    })
  },
  //点击外部关闭弹窗
  showchildclose(){
    this.setData({
      showchild: false
    })
  },
  //查询学生信息
  InquiryButton(){
    let userurl = this.data.userurl
    let chiCard = this.chiCard
    let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if(reg.test(chiCard) == false){
      wx.showToast({
        title: '身份证号码有误',
        icon: 'none',
        duration: 1500
      })
    }else{
      wx.request({
        url: `${userurl}student/findByIdCard`,
        method:'GET',
        header:{
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data:{
          idCard : chiCard
        },
        success: res => {
          let data = res.data.data
          // let chisex = data.sex==1?"男":"女";
          let chistype = data.type==1?"住校生":"走读生";
          this.data.chimes=data
          console.log(res.data);
          this.setData({
            chimes:data,
            // chisex:chisex,
            chistype:chistype
          })
        }
      })
    }
    
    console.log(this.chiCard);
    
  },
  //绑定学生信息
  confirmbinding(){
    let userurl = this.data.userurl
    let appellation = this.data.array[this.data.index].name
    let studentId =this.data.chimes.id
    let msg = app.globalData.userunionId11
    wx.request({
      url: `${userurl}family/bindStudent`,
      method:'PUT',
      header:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data:{
        appellation : appellation,
        studentId:studentId,
        familyId:msg.accountId,
      },
      success: res => {
        console.log(res.data);
        this.studentmes()
      }
    })
    console.log(msg.accountId,"msg");
    console.log(studentId,"studentId");
    console.log(appellation,"appellation");
  },
  //学生信息查询
  studentmes(){
    let userurl = this.data.userurl
    let msg = app.globalData.userunionId11
    wx.request({
      url: `${userurl}family/studentList`,
      method:'GET',
      header:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data:{
        id:msg.id
      },
      success:res=>{
        console.log(res.data.data.studentList[0],"123456");
        let data = res.data.data.studentList
        // this.data.bodaybox = data
        this.setData({
          bodaybox:data
        })
        // console.log(this.data.bodaybox);
        
      }
    })
  },
  //学生管理添加
  insert(){
    let cb = this.data.bodaybox;
    var obj = {
      name: "暂无",
      idCard:"暂无身份证号",
      team:"暂无"
    }
    cb.push(obj)
    // cb.push(this.data.bodaybox.length);
    this.setData({
      bodaybox:cb
    }) 
  },
  //左滑删除
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.bodaybox.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      bodaybox: this.data.bodaybox
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
      that.data.bodaybox.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX){
          v.isTouchMove = false
          
        } //右滑
        else {
          v.isTouchMove = true
        }//左滑
      }
    })
    //更新数据
    that.setData({
      bodaybox: that.data.bodaybox
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    console.log(e.currentTarget.dataset.id,"111");
    let sid = e.currentTarget.dataset.id
    console.log(sid,"2222");
    let userurl = this.data.userurl
    let msg = app.globalData.userunionId11
    console.log(msg,"");
    
    this.data.bodaybox.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      bodaybox: this.data.bodaybox
    })
    wx.request({
      url: `${userurl}family/remove`,
      method:'DELETE',
      header:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data:{
        fId : msg.accountId,
        sId : sid
      },
      success:res=>{
        console.log(res.data,"11111111");
        this.studentmes()
      }
    })
  },

})
