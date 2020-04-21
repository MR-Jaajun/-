// pages/mine/mywallet/balance/bal_detail/bal_detail.js
const util = require('../../../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_balance:"",//余额全部
    bal_income:"",//收入
    bal_expenditure:"",//支出
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
    //全部
    util.we_request({
      "method": util.config. BALANCEAMOUNT,//余额明细
      "type": 0,
      "page": 1,
      "size": 20
    }, res => {
      console.log(res.data);
      this.setData({ all_balance: res.data.data });
    });
    //收入
    util.we_request({
      "method": util.config. BALANCEAMOUNT,//余额明细
      "type": 1,
      "page": 1,
      "size": 20
    }, res => {
      console.log(res.data);
      this.setData({ bal_income: res.data.data });
    });
    //支出
    util.we_request({
      "method": util.config. BALANCEAMOUNT,//余额明细
      "type": 2,
      "page": 1,
      "size": 20
    }, res => {
      console.log(res.data);
      this.setData({ bal_expenditure: res.data.data });
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