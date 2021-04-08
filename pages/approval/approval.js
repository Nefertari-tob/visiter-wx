const app = getApp()
var dayjs = require('../../utils/times.js');
Page({
  data:{
    showDialog: false,
    visitDate:"",
    datalist:[],
    pageNumber :1, 
    pageSize: 10,
    // id: null
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
    // console.log(this.name)
  },
  onLoad: function() {
    const userurl = app.globalData.userurl
    this.setData({userurl:userurl})
    this.axiosvisitor()
    },
    onPullDownRefresh(){
      this.setData({
        visitDate:"",
        datalist:[],
      })
      wx.showNavigationBarLoading();
      this.axiosvisitor();
      // this.onLoad();
    },
    axiosvisitor(pageNumber = 1){
      var teacherId=app.globalData.userunionId11.id
      var userurl = this.data.userurl
    console.log(teacherId)
    wx.request({
      url: `${userurl}visitApplication/getAllVisitApplication`,
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
        const datalist = res.data.data.list   
        // var visitDate = res.data.data.list.visitDate    
        for(var i=0;i<datalist.length;i++){
          datalist[i]["visitDate"] = dayjs(datalist[i]["visitDate"]).format('YYYY-MM-DD HH:mm')
        }   
        // console.log(time)
        // console.log(datalist)
        this.setData({
          datalist: this.data.datalist.concat(datalist),
          // datalist: this.data.datalist.concat(datalist),
          list : res.data.data.list,
          // visitDate : dayjs().format('YYYY-MM-DD HH:mm'),
        })
      }
      })
    },
    onReachBottom: function () { 
      if(this.data.list.length != 10){
        wx.showToast({
          title: '您已经没有访客了！',
          icon: 'none',
          duration: 2000
        })
      }else{
        this.setData({
          visitDate:"",
          // datalist:[],
        })
        wx.showNavigationBarLoading();
        // const { pageNumber = 1 } = this.data;
        const paNumber  = this.data.pageNumber;
        const pageNumber = paNumber + 1
        this.setData({pageNumber: pageNumber})
        this.axiosvisitor(pageNumber);
        wx.hideNavigationBarLoading()
      }
      // if(this.data.list.length == 10){
      //   wx.showNavigationBarLoading();
      //   const { pageNumber = 1 } = this.data;
      //   this.setData({pageNumber: pageNumber + 1})
      //   this.axiosvisitor(pageNumber);
      //   wx.hideNavigationBarLoading()
      // }else{
      //   wx.showToast({
      //     title: '您已经没有访客了！',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
    },
  throughButton(){
    var teacherId=app.globalData.userunionId11.id
    var userurl = this.data.userurl
    wx.request({
      url: `${userurl}visitApplication/approveAllVisitApplication`,
      method:"PUT",
      data:{
        teacherId :teacherId,
      },
      success:res =>{
        console.log(res.data)
        this.setData({
          datalist : []
        })
        this.axiosvisitor()
      }
    })
    
  },
  tapOneDialogButton(e){
    var that = this
    var id = e.currentTarget.id
    // console.log(id)
    var userurl = this.data.userurl
    this.setData({
      id:id
    })
    wx.request({
      url: `${userurl}visitApplication/getVisitApplication`,
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      data:{
        id:id,
      },
      success: res => {
        console.log(res.data.data)
        var msg = res.data.data
        var msgdata = res.data.data.visitDate
        if(msg.sex == 0){
          var sex = "女"
          this.setData({
            sex : sex
          })
        }else{
          var sex = "男"
          this.setData({
            sex : sex
          })
        }
        this.setData({
          msg : msg,
          msgdata: dayjs(msgdata).format('YYYY-MM-DD HH:mm'),
          url:userurl+msg.visitor.picture
        })
      }
    })
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  ydoptButton(){
    // var id = this.data.id
    // console.log(id)
    const { id } = this.data;
    var userurl = this.data.userurl
    wx.request({
      url: `${userurl}visitApplication/approveVisitApplication?id=${id}&pass=1`,
      // url: '${url}visitApplication/approveVisitApplication?{{id}}}}&pass=1',
      method:"PUT",
      // data:{
      //   id  : id,
      //   pass : 0
      // },
      success:res =>{
        console.log(res.data)
        this.setData({
          showDialog: !this.data.showDialog,
          datalist : []
        });
        this.axiosvisitor()
      }
    })
  },
  adoptButton(){
    const { id } = this.data;
    var userurl = this.data.userurl
    wx.request({
      url: `${userurl}visitApplication/approveVisitApplication?id=${id}&pass=0`,
      method:"PUT",
      // data:{
      //   id: this.data.id,
      //   pass: false
      // },
      success: res => {
        this.setData({
          showDialog: !this.data.showDialog,
          datalist : []
        });
        this.axiosvisitor()
      }
    })
  },
  myvisitorButton(){
    wx.navigateTo({
      url: '../Myvisitor/Myvisitor',
    })
  }

  
})