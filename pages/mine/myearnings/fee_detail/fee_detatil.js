// pages/mine/myearnings/fee_detail/fee_detatil.js
const util = require('../../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    actions: [
      {
        name: '已结算佣金'
      }, 
      {
        name: '未结算佣金'
      },
      {
        name: '已退还佣金'
      }
    ],
    all:"",//全部
    earning1:"",//自购
    earning2:"",//推荐
    earning3:"",//团队

  },
  //点击打开弹窗
  showChoose(){
    this.setData({
      show: true
    });
  },
  //点击关闭弹窗
  onClose() {
    this.setData({
      show: false
    });
  },

  onSelect(event) {
    console.log(event.detail);
  },

  //全部
  allEarning(){
    util.we_request({
      "method": util.config. MYPROFIT,
      "type": 0
    }, res => {
      console.log(res)
      this.setData({
        all: res.data.data
      })
    })
  },
  //自购
  earning1() {
    util.we_request({
      "method": util.config. MYPROFIT,
      "type": 1
    }, res => {
      this.setData({
        earning1: res.data.data
      })
    })
  },
  //推荐
  earning2() {
    util.we_request({
      "method": util.config. MYPROFIT,
      "type": 2
    }, res => {
      this.setData({
        earning2: res.data.data
      })
    })
  },
  //团队
  earning3() {
    util.we_request({
      "method": util.config. MYPROFIT,
      "type": 3
    }, res => {
      this.setData({
        earning3: res.data.data
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
    //Commission/myProfitList 收益结算明细
    this.allEarning();
    this.earning1();
    this.earning2();
    this.earning3();

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