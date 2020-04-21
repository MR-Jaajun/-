// pages/group/payorder/payorder.js
const http = require('../../../utils/gethttp.js');
const config = require('../../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    isshow: 0,
    time: 30 * 60 * 60 * 1000,
    timeData: {},
    radio: "1",
    o_detail: "",
    payinfo: "", //订单信息
    order_id: "", //订单id
    countDown: "" //倒计时
  },

  //订单详情
  getData(id) {
    http.request("POST", {
      method: config.f_orderDetail,
      order_id: id
    }).then(res => {
      if (res.data.status == 1) {
        let time1 = "";
        let monent = "";
        let conut_down = ""
        if (res.data.data.order_status == 1) {
          //转换时间戳
          time1 = http.gettime(res.data.data.create_time)
          //当前时间戳
          monent = http.timestamp();
          conut_down = time1 + 30 * 60 * 1000 - monent

        }
        this.setData({
          order_id: res.data.data.id,
          o_detail: res.data.data,
          countDown: conut_down ? conut_down : "",
        })
      } else {
        http.showtoast(res.data.msg, "none")
      }

    })
  },


  //倒计时结束
  finished() {
    // Toast('倒计时结束');
    wx.showToast({
      title: '您超过时间,请重新下单',
      icon: 'none',
      duration: 2000,
      success: function() {
        wx.navigateTo({
          url: '../orderDetial/orderDetial?oid=' + this.data.order_id,
        })
      }
    })
  },
  //支付
  pay() {
    let payinfo = this.data.payinfo;
    wx.setStorage({
      key: "order_id",
      data: this.data.o_detail.id
    })
    wx.requestPayment({
      timeStamp: payinfo.timeStamp,
      nonceStr: payinfo.nonceStr,
      package: payinfo.package,
      signType: 'MD5',
      paySign: payinfo.paySign,
      success: res => {
        wx.getStorage({
          key: 'order_id',
          success(response) {
            console.log(response.data)
            wx.redirectTo({
              url: '/pages/group/orderDetial/orderDetial?oid=' + response.data
            })
          }
        })

        this.setData({
          isshow: 1
        })
      },
      fail: res => {
        wx.getStorage({
          key: 'order_id',
          success(res) {
            console.log(res.data)
          }
        })
        this.setData({
          show: true,
          isshow: 0
        })

      }
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  backs() {
    this.setData({
      show: false
    })

    if (this.data.isshow == 0) {
      wx.getStorage({
        key: 'order_id',
        success: res => {
          console.log(res.data)
          this.getData(res.data)
        }
      })
    }
  },
  nexts() {
    this.setData({
      show: false
    })
    wx.redirectTo({
      url: '../group',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData(options.oid);
    let data = decodeURIComponent(options.payinfo)
    let str = JSON.parse(data)
    console.log(options)
    this.setData({
      payinfo: str,
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