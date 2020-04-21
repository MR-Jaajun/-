// pages/index/notify/message_list/message_list.js
const util = require('../../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList:""
  },

  //跳转到收费结算明细
  toFeeDetail(){
    wx.navigateTo({
      url: '/pages/mine/myearnings/fee_detail/fee_detatil',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // CustomUser/messageList  
    util.we_request({
      "method": "CustomUser/messageList", //消息列表
      "message_type": 1,
      "page": 1,
      "size": 20,
    }, res => {
      console.log(res);
      this.setData({
        activityList: res.data.data
      });
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})