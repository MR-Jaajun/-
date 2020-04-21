// component/gropindex/gropindex.js
const app = getApp();
const util = require("../../utils/util.js");
const http = require("../../utils/gethttp.js");

Component({
  /**
   * 组件的初始数据
   */
  data: {
    goodsList: [],
    active: 0,
    shows: false,
    oid: "",
    status: ""
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.getData(0)
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {},
  /**
   * 组件的方法列表
   */
  methods: {
    //优惠券
    getData(type) {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: http.baseURL2,
        method: 'GET',
        data: {
          method: util.config.f_COUPONSLIST,
          status: type,
          order_type: 0,
          page: 1,
          size: 100
        },
        header: http.header,
        success: res => {
          if (res.data.status == 1) {
            wx.hideLoading();
            // console.log(res)
            let arr = res.data.data
            this.setData({
              goodsList: arr
            })
          } else {
            http.showtoast(res.data.mag, 'none')
          }
        },
        fail(err) {
          wx.hideLoading();
          //请求失败
          console.log(err)
        }
      })
    },
    //切换
    changes(e) {
      console.log(e.detail)
      this.setData({
        active: e.detail.name
      })
      this.getData(e.detail.name)
    },

    //取消订单
    opendia(e) {
      console.log(e.currentTarget.dataset)
      this.setData({
        shows: true,
        oid: e.currentTarget.dataset.oid,
        status: e.currentTarget.dataset.status
      })
      // let num = e.currentTarget.dataset.oid;


    },

    //删除订单 和 取消
    cancelOrder() {
      // console.log(e.currentTarget.dataset.oid)
      //this.data.status ==1 取消  -1 删除
      util.we_request({
        "method": this.data.status == 1 ? util.config.f_cancelOrder : util.config.f_deleteOrder,
        "order_id": this.data.oid
      }, res => {
        console.log(res)
        if (res.data.status == 1) {
          this.getData(this.data.active);
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          this.setData({
            show: false,
            oid: ""
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
    //查看优惠券
    tolookcoupons(e) {
      let str = e.currentTarget.dataset.oid;
      wx.navigateTo({
        url: './lookCoupons/lookCoupons?order=' + str,
      })
    },

    toGoodsDetail(e) {
      // console.log(e)
      let id = e.currentTarget.dataset.oid;
      console.log(id)

      wx.navigateTo({
        url: './orderDetial/orderDetial?oid=' + id,
      })
    },
    refundDetail(e) {
      // console.log(e)
      let id = e.currentTarget.dataset.oid;
      wx.navigateTo({
        url: './refundDetail/refundDetail?oid=' + id,
      })
    },
    //去评价订单
    toappraise(e) {
      console.log(e)
      let title = e.currentTarget.dataset.info.shop_title
      let id = e.currentTarget.dataset.info.id
      let img = e.currentTarget.dataset.info.shop_cover_image
      wx.navigateTo({
        url: './appraise/appraise?title=' + title + "&id=" + id + "&img=" + img,
      })
    }
  },

})
