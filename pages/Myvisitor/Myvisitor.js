var util = require('../../utils/utils.js');
const app = getApp()
var dayjs = require('../../utils/times.js');
Page({
  data:{
    showDialog: false,
    visitDate:"",
    pageNumber :1, 
    pageSize: 10,
    datalist:[]
  },
  // toggleDialog() {
  //   this.setData({
  //     showDialog: !this.data.showDialog
  //   });
  //   console.log(this.name)
  // },
  onLoad: function() {
    // wx.stopPullDownRefresh()
    var currenTime= util.formatTime(new Date());
    const userurl = app.globalData.userurl
    this.setData({
      userurl:userurl,
      currenTime: currenTime
    })
    this.axiosvisitor()
  },
  //下拉刷新
  onPullDownRefresh(){
    this.setData({
      // visitDate:"",
      datalist:[],
    })
    wx.showNavigationBarLoading();
    this.axiosvisitor();
  },
  //拉取列表接口
  axiosvisitor(pageNumber = 1){
    let teacherId=app.globalData.userunionId11.id
    var userurl = this.data.userurl
    wx.request({
      url: `${userurl}visitApplication/getMyVisitApplication`,
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      data:{
        pageNumber : pageNumber,
        pageSize: this.data.pageSize,
        teacherId :teacherId,
        visitDate :this.data.visitDate
      },
      success: res => {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
        // console.log(res.data.data.list)
        const datalist = res.data.list
        // const visitDate = res.data.list.visitDate 
        for(var i=0;i<datalist.length;i++){
          datalist[i]["visitDate"] = dayjs(datalist[i]["visitDate"]).format('YYYY-MM-DD HH:mm')
        } 
        this.setData({
          datalist: this.data.datalist.concat(datalist),
          // vidata : dayjs().format('YYYY-MM-DD HH:mm'),
          list : res.data.list,
          // datalist: datalist,
          // url: userurl
        })
        console.log(this.data.list)
      }
    })
  },
  onReachBottom: function () {
    if(this.data.list.length == 10){
      // this.setData({
      //   visitDate:"",
      //   // datalist:[],
      // })
      wx.showNavigationBarLoading();
      // const { pageNumber = 1 } = this.data;
      const paNumber  = this.data.pageNumber;
      const pageNumber = paNumber + 1
      this.setData({pageNumber: pageNumber})
      this.axiosvisitor(pageNumber);
      wx.hideNavigationBarLoading()
    }else{
      wx.showToast({
        title: '您已经没有访客了！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  tapOneDialogButton(){
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  //时间选择器
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      visitDate: e.detail.value,
      datalist :[]
    })
    this.axiosvisitor();
  },

})