// pages/mine/feedback/feedback.js

const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text_num: 0, //文字字数
    problem_desc: "", //文字内容
    contact_name: "", //联系人
    contact_mobile: "" //联系电话
  },
  //统计字数和文字内容
  getContent(e) {
    this.setData({
      text_num: e.detail.cursor,
      problem_desc: e.detail.value
    })
    // console.log(this.data.text_num);
    // console.log(this.data.problem_desc);
  },

  //联系人
  getName(e) {
    console.log(e.detail)
    this.setData({
      contact_name: e.detail.value
    })
  },
  //联系方式
  getMobile(e) {
    console.log(e.detail)
    this.setData({
      contact_mobile: e.detail.value
    })
  },


  sendinfo() {
    //反馈意见
    util.we_request({
      "method": util.config.FEEDBACKPROBLEM,
      "feedback_type": "其他问题",
      "problem_desc": this.data.problem_desc,
      "contact_name": this.data.contact_name,
      "contact_mobile": this.data.contact_mobile
    }, (res) => {
      console.log(res);
      if (res.data.status == 1) {
        wx.showModal({
          title: "反馈成功",
          content: "请点击确定返回上一页",
          showCancel: false,
          success(r) {
            if (r.confirm) {
              wx.navigateBack({
                url: '../mine'
              })
            }
          }
        })
      } else if (res.data.status == 0) {
        wx.hideLoading();
        wx.showModal({
          title: "提示",
          content: "您的"+ res.data.msg+",请重新填写",
          showCancel: false,
          success(r) {
            if(r.confirm){
              console.log("该用户要重新填写")
            }
          }
        })
      }
    });
  },
  // FEEDBACKPROBLEM
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