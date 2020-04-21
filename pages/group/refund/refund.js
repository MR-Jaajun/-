// pages/group/refund/refund.js
const http = require('../../../utils/gethttp.js');
const config = require('../../../utils/config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: "",
    price: 100,
    tatol: "",
    arr: [{
      verify_code: 10025,
      order_goods_id: 123456
    }],
    list: ['计划有变，没时间消费', '误认为是外卖', '没有座位，预约不上', '商家营业，但不接待', '商家停业/转让/装修', '买错了/买多了'],
    result: [],
    result2: [],
    show: false

  },


  //选择退款原因
  onChange(event) {
    // console.log(event)
    this.setData({
      result: event.detail
    });
  },
  onChange2(event) {
    // console.log(event)
    let all = ""
    if (this.data.price) {
      all = (event.detail.length * this.data.price).toFixed(2)
    } else {
      all = (event.detail.length * 0).toFixed(2)
    }
    this.setData({
      result2: event.detail,
      tatol: all
    });
    // console.log(this.data.result2.length)
  },
  toggle(event) {
    // console.log(event)
    const {
      index
    } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  toggle2(event) {
    const {
      index2
    } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes2-${index2}`);
    checkbox.toggle();
  },
  noop() {},
  noop2() {},
  //打开弹窗
  opendia() {
    this.setData({
      show: true
    })
  },
  refund() {
    let str = this.data.result.join(",")
    let str2 = this.data.result2.join(",")
    http.request("POST", {
      method: config.f_orderRefund,
      order_id: this.data.order_id,
      order_goods_id: str2,
      reason: str
    }).then(res => {
      if (res.data.status == 1) {
        http.showtoast(res.data.msg, 'success')
        wx.redirectTo({
          url: '../orderDetial/orderDetial?oid=' + this.data.order_id,
        })
      } else {
        http.showtoast(res.data.msg, 'none')
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options, '传过来的数据')
    let a = options.str || "";
    let arr = JSON.parse(a);
    this.setData({
      arr: arr || "",
      order_id: options.oid || "",
      price: options.price || ""
    })
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