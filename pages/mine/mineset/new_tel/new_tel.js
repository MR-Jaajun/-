// pages/mine/mineset/new_tel/new_tel.js
const util = require('../../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt: "获取验证码",
    time: 30, //倒计时
    newMobile: "", //新手机
    verify: "", //验证码
    isSend: true,
  },
  //新手机号码
  getMobile(e) {
    console.log(e.detail.value)
    this.setData({
      newMobile: e.detail.value
    })
  },

  //输入验证码
  mobileCode(e) {
    this.setData({
      verify: e.detail.value
    })
  },
  //获取验证码
  getCode() {
    util.showloading("加载中", "已发送");
    this.setData({
      isSend: false
    })
    //重新获取的验证码的定时器
    let lastTime = 30;
    let that = this;
    let timer = setInterval(function() {
      lastTime -= 1;
      that.setData({
        time: lastTime
      })
      if (lastTime == 0) {
        clearInterval(timer);
        that.setData({
          isSend: true,
        })
      }
    }, 1000)
    util.we_request({
      "method": util.config.SENDSMS,
      "mobile": this.data.newMobile,
      "send_id": 10003,
      "openid": app.globalData.mini_openid
    }, res => {
      console.log("获取验证码：", res)
    })
  },


  //点击确认绑定
  bindMobile() {
    //BINDMOBILE 绑定手机号
    // wx.redirectTo({
    //   url: "../../mineinfo/mine_info"
    // })
    // util.we_request({
    //   "method": util.config.BINDMOBILE,
    //   "mobile": this.data.newMobile,
    //   "verify": this.data.verify,
    //   "openid": app.globalData.mini_openid
    // },res=>{
    //   console.log(res);
    //   util.showloading("绑定中", "绑定成功", setTimeout(function () {
    //     wx.redirectTo({
    //       url: "../../mineinfo/mineinfo"
    //     })
    //   }, 500))
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})