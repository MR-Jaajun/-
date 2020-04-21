// pages/group/orderDetial/orderDetial.js
const http = require('../../../utils/gethttp.js');
const config = require('../../../utils/config.js');
const {
  barcode,
  qrcode
} = require('../../../utils/changeCode.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show2: false,
    time: 10 * 1000,
    show: false,
    show3: false,
    o_detail: "",
    order_status: "",
    create_time: "",
    countDown: "",
    goods_detail: "",
    shop_tel: "",
    codeshow: false,
    pink_member: []
  },
  loadmore() {
    let bool = !this.data.show;
    this.setData({
      show: bool
    })
  },
  //倒计时完成出发
  finished() {
    wx.showToast({
      title: '您超过时间,请重新下单',
      icon: 'none',
      duration: 2000,
      success: function() {
        wx.navigateTo({
          url: '../group',
        })
      }
    })
  },
  //是否拨打电话
  is_call() {
    this.setData({
      show: true
    })
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.shop_tel //仅为示例，并非真实的电话号码
    })
  },
  //订单详情
  getData(id) {
    http.request("POST", {
      method: config.f_orderDetail,
      order_id: id
    }).then(res => {
      console.log(res, 'ssssssssssssss')
      let time1 = "";
      let monent = "";
      let conut_down = "";
      if (res.data.data.is_pink == 1) {
        if (res.data.data.pink_status == 1) {
          if (res.data.data.order_status == 1) {
            //转换时间戳
            time1 = http.gettime(res.data.data.create_time)
            //当前时间戳
            monent = http.timestamp();
            conut_down = time1 + 30 * 60 * 1000 - monent
          } else {
            //转换时间戳
            time1 = http.gettime(res.data.data.create_time)
            //当前时间戳
            monent = http.timestamp();
            conut_down = time1 + 24 * 60 * 60 * 1000 - monent
          }

        }
      } else {
        //转换时间戳
        time1 = http.gettime(res.data.data.create_time)
        //当前时间戳
        monent = http.timestamp();
        conut_down = time1 + 30 * 60 * 1000 - monent
      }

      // console.log(time1, monent)
      this.setData({
        o_detail: res.data.data,
        order_status: res.data.data.order_status,
        create_time: res.data.data.create_time,
        countDown: conut_down ? conut_down : "",
        goods_detail: res.data.data.goods_data.goods_detail,
        shop_tel: res.data.data.contact_information,
        pink_member: res.data.data.pink_member
      })
    })
  },
  //去申请退款
  toRefund() {
    let price = this.data.o_detail.sale_price;
    let oid = this.data.o_detail.id;
    let str = JSON.stringify(this.data.o_detail.goods);
    wx.navigateTo({
      url: '../refund/refund?price=' + price + "&oid=" + oid + "&str=" + str
    })
  },
  //查看退款详情
  refundDetail(e) {
    let oid = this.data.o_detail.id;
    // console.log(e.currentTarget.dataset.gid)
    wx.navigateTo({
      url: '../refundDetail/refundDetail?oid=' + oid + "&gid=" + e.currentTarget.dataset.gid
    })
  },
  //查看券码
  showPopup(e) {
    let codes = e.currentTarget.dataset.code
    // console.log(e.currentTarget.dataset.code)
    this.setData({
      codeshow: true
    });
    barcode('barcode2', codes, 600, 150); //条形码
    qrcode('qrcode2', codes, 500, 500); //二维码
  },
  onClose() {
    this.setData({
      codeshow: false
    });
  },
  //去商品详情
  toshopdetail() {
    wx.navigateTo({
      url: '../shopdetail/shopdetail?id=' + this.data.o_detail.goods_id + "&ispink=" + this.data.o_detail.is_pink
    })
  },
  //去商家详情
  toshopinfo() {
    wx.navigateTo({
      url: '../shopinfo/shopinfo?id=' + this.data.o_detail.shop_id
    })
  },
  //去评价
  toappraise(e) {
    console.log(this.data.o_detail)
    let title = this.data.o_detail.shop_title
    let id = this.data.o_detail.id
    let img = this.data.o_detail.shop_cover_image
    let o_gid = e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '../appraise/appraise?title=' + title + "&id=" + id + "&img=" + img + "&o_gid=" + o_gid,
    })
  },
  //查看评价
  toAppraise(e) {
    console.log(e.currentTarget.dataset.comment)
    wx.navigateTo({
      url: '../lookAppraise/lookAppraise?aid=' + e.currentTarget.dataset.comment,
    })
  },
  //去支付
  topay() {
    http.request("POST", {
      method: config.PAYORDER,
      type: 3,
      order_id: this.data.o_detail.id,
      pay_app_id: "wxminipay",
    }).then(res => {
      console.log(res)
      if (res.data.status == 1) {
        let str = encodeURIComponent(JSON.stringify(res.data.data))
        wx.navigateTo({
          url: '../payorder/payorder?payinfo=' + str + "&oid=" + this.data.o_detail.id,
        })
      } else {
        http.showtoast(res.data.msg, "none")
      }
    })
  },
  todel() {
    this.setData({
      show3: true,
    })
  },
  //删除订单
  cancelOrder() {
    http.request("POST", {
      method: config.f_deleteOrder,
      order_id: this.data.o_detail.id
    }).then(res => {
      console.log(res)
      if (res.data.status == 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000,
        })
        wx.redirectTo({
          url: '../group',
        })
        this.setData({
          show3: false,
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  //申请退款
  shenqing() {
    // http.showtoast('')
    http.request("POST", {
      method: config.f_orderRefund,
      order_id: this.data.o_detail.id,
      order_goods_id: this.data.o_detail.goods[0].order_goods_id,
      reason: "111"
    }).then(res => {
      if (res.data.status == 1) {
        http.showtoast(res.data.msg, 'success')

      } else {
        http.showtoast('该订单正在拼团中，请稍后再尝试', 'none')
      }

    }).catch(err => {
      http.showtoast('该订单正在拼团中，请稍后再尝试', 'none')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.oid
    this.setData({
      oid: id
    })
    // let id = options.oid || 1638;
    this.getData(id);

    // wx.getShareInfo()
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
    return {
      title: "小哥邀请你拼团",
      path: "/pages/group/orderDetial/orderDetial?oid=" + this.data.o_detail.id
    }
  }
})