// pages/appointment/appointment.js
var dateTimePicker = require('../../utils/api.js');
var utils = require('../../utils/utils.js');
// var date = new Date();
// var currentHours = date.getHours();
// var currentMinute = date.getMinutes();
const app = getApp()
Page({
  data: {
    msg:[],

    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2020,
    endYear: 2050,
    phone: null,
    Company:null,
    type:"",
    interview:"",
    time:"",
    pterhone:"",
    message:[]
  },

  onLoad: function() {
    var that = this
    const msg = app.globalData.userunionId11
    const userurl = app.globalData.userurl
    var currenTime= utils.formatTime(new Date());
    console.log(msg)
    // console.log( userurl+msg.picture);
    this.setData({
      msg: msg,
      url : userurl+msg.picture,
      userurl:userurl,
      currenTime: currenTime,
      phone:msg.phone,
      dateTime1:null
    })
    //获取来访事项
    wx.request({
      url: `${userurl}type/getType`,
      method:"GET",
      header:{
        'content-type':'application/json'
      },
      success(res) {
        console.log(res.data.data)
        that.setData({array:res.data.data}); 
      },
    })

    // 获取完整的年月日 时分秒，以及默认显示的数组;
     var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
     // 精确到分的处理，将数组的秒去掉
    //  var lastArray = obj1.dateTimeArray.pop();
    //  var lastTime = obj1.dateTime.pop();

     this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
     });
  },
  //预约记录查询
  onCancel1(){
    wx.navigateTo({
      url: '../record/record',
    })
  },
  //来访事项
  bindPickerChange(e){
    // console.log(e)
    var index = e.detail.value;
    var type = this.data.array[index].id;
    console.log(type);
    this.setData({
      index: e.detail.value,
      type
    })
  },
  //电话号码
  phoneInput:function(e){
    this.setData({
      phone:e.detail.value,
    })
  },
  //老师电话号码
  pterhoneInput(e){
    this.setData({
      pterhone:e.detail.value,
    })
    this.pterhone = e.detail.value
  },
  //访客单位
  CompanyInput:function(e){
    this.setData({
      Company:e.detail.value,
    })
    this.Company = e.detail.value
  },
  //查询老师信息
  phoneButton(){
    var that = this
    that.setData({message:""})
    // var pterhone = this.data.pterhone
    // console.log(pterhone)
    if(this.data.pterhone == null){
      wx.showToast({
        title: "请输入电话号码",
        icon: 'none',
        duration: 2000
      })
    }else if(this.data.pterhone.length != 11){
      wx.showToast({
        title: "电话号码不正确",
        icon: 'none',
        duration: 2000
      })
    }else{
      var that = this
      var userurl = this.data.userurl
      wx.request({
        url: `${userurl}information/getTeacherByPhone`,
        method:'GET',
        header:{
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data:{
          phone  : that.pterhone
        },
        success(res){
          if(res.data.data == null){
            wx.showToast({
              title: "查无此人",
              icon: 'none',
              duration: 2000
            })
          }else{
            var teacherId = res.data.data.teacherId
            const message=res.data.data
            // that.message=res.data.data
            that.teacherId=teacherId
            // console.log(that.message)
            that.setData({message:message})
          }
        }
      })
    }
  },
  //提交审核
  submitButton(){
    // var that = this
    var phone = this.data.type
    // var message =that.message
    // console.log(message)
    if(this.data.phone == null){
      wx.showToast({
        title: "请输入电话号码",
        icon: 'none',
        duration: 2000
      })
    }else if(this.data.phone.length != 11){
      wx.showToast({
        title: "电话号码不正确",
        icon: 'none',
        duration: 2000
      })
    }else if(this.data.Company == null){
      wx.showToast({
        title: "请填写访客单位",
        icon: 'none',
        duration: 2000
      })
    }
    else{
    var userurl = this.data.userurl
    var that = this
    const msg = app.globalData.userunionId11
    wx.request({
      url: `${userurl}visitApplication/addVisitApplication`,
      method:'POST',
      header:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data:{
        phone : this.data.phone,
        teacherId: that.teacherId,
        typeId  : this.data.type,
        visitDate  : that.time,
        visitorId  : msg.id,
        unit  : that.Company,
      },
      success(res) {
        console.log(res.data);
        var code = res.data.code
        if(code == 0){
          wx.showModal({
            title: '提交成功',
            content: '预约已提交，请等待受访人确认',
            showCancel: false,
            confirmText: '确认',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          });
        }else{
          wx.showModal({
            title: '',
            content: '信息填写不全，请认真核对',
            showCancel: false,
            confirmText: '确认',
            success: function (res) {
              if (res.confirm) {
                
              }
            }
          });
        }
      },
    })
  }
  },

  // bindPickerChange: function (e) {
  //   console.log(e)
  //   var index = e.detail.value;
  //   var systemId = this.data.array[index].id;
  //   console.log(systemId);
  //   this.setData({
  //     index: e.detail.value,
  //     systemId
  //   })
  // },



  //时间
  changeDate(e){
    this.setData({ date:e.detail.value});
    },
    changeTime(e){
    this.setData({ time: e.detail.value });
    },
  //   changeDateTime(e){
  //   this.setData({ dateTime: e.detail.value });
  //   },
    changeDateTime1(e) {
    var that = this
    this.setData({ dateTime1: e.detail.value });
    var index = e.detail.value;
    var dateTimeArray = this.data.dateTimeArray1
    var dateTime = this.data.dateTime1
    // var year = this.data.objectregionarray[index];
    var time1 = dateTimeArray[0][dateTime[0]]
    var time2 = dateTimeArray[1][dateTime[1]]
    var time3 = dateTimeArray[2][dateTime[2]]
    var time4 = dateTimeArray[3][dateTime[3]]
    var time5 = dateTimeArray[4][dateTime[4]]
    var time = time1 + "-" + time2 + "-" +  time3 + " " + time4+ ":" + time5
    that.time = time
    },
    changeDateTimeColumn1(e) {

      var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
      // var that = this
      arr[e.detail.column] = e.detail.value;
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
      
      this.setData({ 
       dateTimeArray1: dateArr,
       dateTime1: arr
      });
      },
})