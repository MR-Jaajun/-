// pages/mine/myteam/my_team.js
const util = require("../../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_one_team: true,
    show_recommend: true,
    num: 10,
    allGroup: [],
    oneTeam: [],
    shops: [],
  },
  //展开看详细信息
  show_details(e) {
    console.log(e)
    // let a = e.currentTarget.dataset.index;
    let a = "allGroup[" + e.currentTarget.dataset.idx + "].status"
    this.setData({
      [a]: 1
    });
  },
  close_details(e) {
    let a = "allGroup[" + e.currentTarget.dataset.idx + "].status"
    this.setData({
      [a]: 0
    });

  },
  show_one_team(e) {
    let b = "oneTeam[" + e.currentTarget.dataset.idx + "].status"
    this.setData({
      [b]: 1
    });
  },
  close_one_team(e) {
    let b = "oneTeam[" + e.currentTarget.dataset.idx + "].status"
    this.setData({
      [b]: 0
    });
  },
  show_recommend() {

  },
  close_recommend() {

  },
  //跳转到二级团队
  two_team() {
    wx.navigateTo({
      url: './twoTeam/twoTeam'
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
    //Commission/groupList 我的团队
    //全部
    util.we_request({
      "method": util.config.GROUPLIST,
      "level": 0,
      "page": 1,
      "size": 20
    }, res => {
      console.log(res.data.data)
      this.setData({
        allGroup: res.data.data,
      })
    });

    //一线团队
    util.we_request({
      "method": util.config.GROUPLIST,
      "level": 1,
      "page": 1,
      "size": 20
    }, res => {
      console.log(res.data.data)
      this.setData({
        oneTeam: res.data.data,
      })
    });

    //推荐商家
    // util.we_request({
    //   "method": "Commission/groupList",
    //   "level": 3,
    //   "uid":1,
    //   "page": 1,
    //   "size": 20
    // }, res => {
    //   console.log(res.data.data)
    //   this.setData({
    //     shops: res.data.data,
    //   })
    // });

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