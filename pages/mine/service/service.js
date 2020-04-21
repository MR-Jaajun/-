// pages/mine/service/service.js
const util = require("../../../utils/util");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    problemList: ['退款售后（拒绝退款/平台介入）', '解除绑定（手机号/银行卡）', '修改密码（支付密码/登录密码）'],
    moreList: ['外卖问题', '商城问题', '团购问题', '到店付问题']
    // change_show:true
  },

  //拨打电话  
  call() {
    wx.makePhoneCall({
      phoneNumber: '13366699988'
    })
  },
  //问题详情
  toDetail(e) {
    console.log(e.target.dataset);
    //跳转时把标题带去下一个页面
    var title = this.data.moreList[e.target.dataset.index]
    wx.navigateTo({
      url: './problem_detail/problem_detail?title=' + title,
    })
  },


  // change(){
  //   this.data.change_show = !this.data.change_show;
  //   this.setData({ change_show: this.data.change_show});
  //   console.log(this.data.change_show);
  // },
  //跳转到选择订单（投诉）
  // complain(){
  //   wx.navigateTo({
  //     url: './complain/complain',
  //   })
  // },
  //跳转到服务进度
  // rate_of_progress() {
  //   wx.navigateTo({
  //     url: './rate_of_progress/rate_of_progress',
  //   })
  // },
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
    util.we_request({
      "method": util.config.COMMONPROBLEM,
      "problem_type": 1
    }, res => {
      console.log(res.data.data);
    });
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