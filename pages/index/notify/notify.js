// pages/index/notify/notify.js
const util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // unread_amount: "",//未读数量
    // title:"",//标题
    // create_time:"",//创建时间
    // content: "",//内容
    message_type1:"",
    message_type2:"",
  },

  //跳转到活动列表
  toActivityList(){
    wx.navigateTo({
      url: './activity_list/activity_list',
    })
  },
  //跳转到通知列表
  toMessageList() {
    wx.navigateTo({
      url: './message_list/message_list',
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
    util.we_request({
      "method":"CustomUser/userMessage",//用户消息
    },res=>{
      console.log(res.data.data);
      this.setData({
        message_type1:res.data.data[0],
        message_type2: res.data.data[1]
      });
    });
    console.log(this.data.message_type1, this.data.message_type2)
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