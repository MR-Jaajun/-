// pages/group/shopdetail/shopdetail.js
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog'
var util = require('../../../utils/util.js');
var http = require('../../../utils/gethttp.js');
var config = require('../../../utils/config.js');
const store = require("../../../utils/store.js")
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item_data: {},
    nick_name: '', //团长昵称
    avatarUrl: '',
    pinshow: false,
    show1: false,
    show2: false,
    xhow: false,
    value: 3,
    height: 0,
    width: 0,
    countDown: "", //倒计时
    time: 30 * 60 * 60 * 1000,
    goods_id: "",
    goods_pink_amount: '',
    goods_pink_price: '',
    goods_detail: [], //套餐详情 
    goods_detail_image: [],
    obj: null,
    pink_list: [], //拼团
    goods_comment_data: [], //评价
    str_zhe: '' //折
  },
  //点击参团
  showClick(e) {
    // 判断用户是否登录
    let mini_token = app.globalData.mini_token || store.getItem("mini_token")
    console.log(mini_token)
    if (!mini_token) {
      wx.navigateTo({
        url: "/pages/zindex/zindex",
      })
    } else {
      let userInfo = wx.getStorageSync("userinfo");
      let name = e.currentTarget.dataset.name
      this.setData({
        avatarUrl: userInfo.userInfo.avatarUrl,
        pinshow: true,
        item_data: name
      });
    }

  },
  //点击参团确认按钮
  onConfirm(e) {
    console.log(e)
    let type = e.currentTarget.dataset.type
    let item = JSON.stringify(this.data.obj)
    wx.navigateTo({
      url: `/pages/group/orderfu/orderfu?item=${item}&type=${type}`
    })

  },
  onClose() {
    this.setData({
      close: false,
    });
  },
  // 更多菜品
  loadmore2() {
    let bool2 = !this.data.show2
    this.setData({
      show2: bool2,
    })
  },
  //更多规则
  loadmore1() {
    let bool1 = !this.data.show1
    this.setData({
      show1: bool1,
    })
  },
  //更多评价
  Xloadmore() {
    let xbool = !this.data.xhow
    this.setData({
      xhow: xbool,
    })
  },
  //去提交订单
  GoEnter(e) {
    let mini_token = app.globalData.mini_token || store.getItem("mini_token")
    console.log(mini_token)
    if (!mini_token) {
      wx.navigateTo({
        url: "/pages/zindex/zindex",
      })
    }else {
      console.log('0909')
      let type = e.currentTarget.dataset.type
      let item = JSON.stringify(this.data.obj)
      wx.navigateTo({
        url: `/pages/group/orderfu/orderfu?item=${item}&type=${type}`
      })
    }
  },
  goodsDetail() {
    http.request("GET", {
      goods_id: this.data.goods_id,
      method: "GroupShop/goodsDetail"
    }).then(res => {
      if (res.data.data.goods_type == 1) {
        wx.setNavigationBarTitle({
          title: '代金劵详情'
        })
      }
      if (res.data.data.goods_type == 2) {
        wx.setNavigationBarTitle({
          title: '商品详情'
        })
      }
      let zhe = (res.data.data.goods_sale_price / res.data.data.goods_market_price).toFixed(2)
      let zhe_num = zhe * 10
      let pinarr = res.data.data.goods_pink.pink_list
      //当前时间戳
      let monent = http.timestamp();
      let pinkList = []
      pinarr.map(item => {
        let time1 = item.create_time * 1000
        item.countDown = time1 + 24 * 60 * 60 * 1000 - monent
        pinkList.push(item)
      })
      this.setData({
        goods_detail: res.data.data.goods_detail,
        goods_detail_image: res.data.data.goods_detail_image,
        obj: res.data.data,
        pink_list: pinkList,
        goods_comment_data: res.data.data.goods_comment.goods_comment_data,
        str_zhe: zhe_num
      })

    })
  },
  // 去店铺详情
  goshopinfo(e) {
    // console.log(e.currentTarget.dataset.id,"shop_id")
    let id = JSON.stringify(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `/pages/group/shopinfo/shopinfo?id=${id}`
    })
  },
  // 拨打电话
  dianhua() {
    Dialog.confirm({
      message: '是否电话联系商家'
    }).then(() => {
      wx.makePhoneCall({
        phoneNumber: this.data.obj.shop_contact_information
      })
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      goods_id: JSON.parse(options.id),
      goods_pink_amount: options.ispink == 1 ? JSON.parse(options.amount) : "",
      goods_pink_price: options.ispink == 1 ? JSON.parse(options.price) : "",
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })
    this.goodsDetail()
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
  onShareAppMessage: function() {}
})