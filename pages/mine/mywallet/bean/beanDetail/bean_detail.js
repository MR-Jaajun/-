// pages/mine/mywallet/bean/beanDetail/bean_detail.js
const util = require('../../../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allList:"",//全部
    income:"",//收入
    expenditure:"",//支出
    

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
    // "CustomUser/beanList"小哥豆明细
    //全部
    util.we_request({
      "method": util.config.BEANLIST,
      "bean_type":0,
      "page":1,
      "size":20
    },res=>{
      console.log(res.data);
      this.setData({ allList: res.data.data});
    });
    //收入
    util.we_request({
      "method": "CustomUser/beanList",
      "bean_type": 1,
      "page": 1,
      "size": 20
    }, res => {
      console.log(res.data);
      this.setData({ income: res.data.data });
    });
    //支出
    util.we_request({
      "method": "CustomUser/beanList",
      "bean_type": 2,
      "page": 1,
      "size": 20
    }, res => {
      console.log(res.data);
      this.setData({ expenditure: res.data.data });
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