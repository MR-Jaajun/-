// pages/mine/myearnings/my_earnings.js
const util = require('../../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance_amount: "", //账户余额
    total_amount: "", //累计收益结算
    earning1: "", //自消费收益
    earning2: "", //推荐商家收益
    earning3: "", //团队收益
    earning4: "" //其他收益
  },
  //跳转到去提现的页面
  withdraw() {
    wx.navigateTo({
      url: '../withdraw/withdraw_money'
    })
  },
  //跳转到去提现记录
  record() {
    wx.navigateTo({
      url: './record/record'
    })
  },
  //跳转到收益结算明细
  toFeeDetail() {
    wx.navigateTo({
      url: '/pages/mine/myearnings/fee_detail/fee_detatil'
    })
  },

  //自消费收益
  earning1() {
    util.we_request({
      "method": util.config. MYPROFIT,
      "type": 1
    }, res => {
      console.log(res)
      this.setData({
        earning1: res.data.data,
        balance_amount: res.data.data.balance_amount,
        total_amount: res.data.data.total_amount
      })
    })
  },
  //推荐商家收益
  earning2() {
    util.we_request({
      "method": util.config. MYPROFIT,
      "type": 2
    }, res => {
      this.setData({
        earning2: res.data.data,
      })
    })
  },
  //团队收益
  earning3() {
    util.we_request({
      "method": util.config. MYPROFIT,
      "type": 3
    }, res => {
      this.setData({
        earning3: res.data.data,
      })
    })
  },
  //其他收益
  earning4() {
    util.we_request({
      "method": util.config. MYPROFIT,
      "type": 4
    }, res => {
      this.setData({
        earning4: res.data.data,
      })
    })
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
    //Commission/myProfit 我的收益
    this.earning1();
    this.earning2();
    this.earning3();
    this.earning4();
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