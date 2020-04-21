// pages/mine/mywallet/bean/bean.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bean:'0'
  },
  //跳转到小哥豆充值
  // bean_recharge() {
  //   wx.navigateTo({
  //     url: './beanRecharge/bean_recharge',
  //   })
  // },
  //跳转到小哥豆明细
  bean_detail() {
    wx.navigateTo({
      url: './beanDetail/bean_detail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({ bean: options.bean })

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