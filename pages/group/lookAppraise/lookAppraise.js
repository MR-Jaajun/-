// pages/group/lookAppraise/lookAppraise.js
const config = require("../../../utils/config.js");
const http = require("../../../utils/gethttp.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 5,
    test: "非常满意",
    value2: 5,
    comment_id: null,
    comment_detail: null,
    show: false,
    bigimg: null
  },
  getdata(id) {
    http.request("GET", {
      method: config.f_commentDetail,
      comment_id: id
    }).then(res => {
      if (res.data.status == 1) {
        console.log(res.data.data)
        this.setData({
          comment_detail: res.data.data
        })
      } else {
        http.showtoast(res.data.msg, "none")
      }
    })
  },
  onClickShow(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      show: true,
      bigimg: e.currentTarget.dataset.url
    });
  },

  onClose() {
    this.setData({
      show: false,
      bigimg: ""
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // /api/GroupOrder/commentDetail
    // console.log(options.aid)
    this.getdata(options.aid)
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