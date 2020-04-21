import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog'
var http = require('../../../utils/gethttp.js');
var config = require('../../../utils/config.js');
const store = require("../../../utils/store.js")
const app = getApp();

Component({
  /**
   * 组件的初始数据
   */
  data: {
    height: wx.getSystemInfoSync().windowHeight,
    showMoreDate: false,
    goodsList: [],
    active: 0,
    shows: false,
    oid: "",
    status: "",
    page: 1,
    pageSize: 10,
    hasMoreData: true,
    type: 0,
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.getData()
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

  methods: {
    //订单数据
    getData() {
      http.request('GET', {
        method: config.w_orderList,
        status: this.data.type,
        order_type: -1,
        page: this.data.page,
        size: this.data.pageSize,
      }).then(res => {
        var contentlistTem = this.data.goodsList;
        if (res.data.code == 200) {
          if (this.data.page == 1) {
            contentlistTem = []
          }
          var contentlist = res.data.data;
          if (contentlist.length < this.data.pageSize) {
            this.setData({
              goodsList: contentlistTem.concat(contentlist),
              hasMoreData: false,
              showMoreDate: false
            })
          } else {
            this.setData({
              goodsList: contentlistTem.concat(contentlist),
              showMoreDate: false,
              hasMoreData: true,
              page: this.data.page + 1
            })
          }
        } else {
          wx.showToast({
            title: '出现异常'
          })
        }
      })
    },
    //切换
    changes(e) {
      console.log(e.detail)
      this.setData({
        active: e.detail.name,
        type: e.detail.name,
        goodsList: []
      })
      this.getData()
    },

    //查看物流
    steps(e) {
      let id = e.currentTarget.dataset.oid;
      wx.navigateTo({
        url: `/pages/mall/steps/steps?oid=${id}`,
      })
    },
    //去评价
    feedback(e) {
      console.log(e)
      let cover_image = e.currentTarget.dataset.oid[0].cover_image
      let order_goods_id = e.currentTarget.dataset.oid[0].goods_id
      let order_id = e.currentTarget.dataset.oid[0].order_id
      let goods_title = e.currentTarget.dataset.oid[0].goods_title
      wx.navigateTo({
        url: `/pages/mall/feedback/feedback?cover_image=${cover_image}&order_goods_id=${order_goods_id}&order_id=${order_id}&title=${goods_title}`,
      })
    },
    //提醒发货
    confirmReceive(e) {
      let id = e.currentTarget.dataset.oid;
      this.setData({
        oid: e.currentTarget.dataset.oid,
        status: e.currentTarget.dataset.status
      })
      http.request("POST", {
        method: config.w_remindOrder,
        order_id: this.data.oid || 2000,
      }).then(res => {
        http.showtoast(res.data.msg, "none")
      })
    },

    // 取消订单
    cancelOrder(e) {
      console.log(e)
      let id = e.currentTarget.dataset.oid;
      Dialog.confirm({
        title: '确认取消订单？',
        message: '订单取消后将不可恢复，是否取消订单？'
      }).then(() => {
        http.request('POST', {
          method: config.w_cancelOrder,
          order_id: id,
        }).then(res => {
          wx.showToast({
            title: res.data.msg,
            duration: 2000
          })
          this.getData()
        })

      })
    },
    //删除订单
    cearOrder(e) {
      console.log(e)
      let id = e.currentTarget.dataset.oid;
      Dialog.alert({
        title: '确认删除订单？',
        message: '订单删除后将不可恢复，是否删除订单？'
      }).then(() => {
        http.request('POST', {
          method: config.w_deleteOrder,
          order_id: id,
        }).then(res => {
          wx.showToast({
            title: res.data.msg,
            duration: 2000
          })
          this.getData()
        })

      })
    },
    //去支付
    topay(e) {
      let id = e.currentTarget.dataset.oid;
      http.request("POST", {
        method: config.PAYORDER,
        type: 2,
        order_id: id,
        pay_app_id: "wxminipay",
      }).then(res => {
        console.log(res)
        if (res.data.status == 1) {
          let str = encodeURIComponent(JSON.stringify(res.data.data))
          wx.navigateTo({
            url: '/pages/group/payorder/payorder?payinfo=' + str + "&oid=" + id,
          })
        } else {
          http.showtoast(res.data.msg, "none")
        }
      })
    },
    //订单详情
    toGoodsDetail(e) {
      let id = e.currentTarget.dataset.oid;
      wx.navigateTo({
        url: `../mallOrderDetial/mallOrderDetial?oid=${id}`,
      })
    },
    // 往上滑
    upper() {
      wx.showNavigationBarLoading() //下拉等待动画
      this.data.page = 1
      this.getData()
      setTimeout(() => {
        wx.stopPullDownRefresh() // 手动停止，若不停止则在1秒后自己停止
        wx.hideNavigationBarLoading() //隐藏下拉等待动画
      }, 1000)
    },
    // 往下滑
    lower() {
      if (this.data.hasMoreData) {
        this.getData()
      } else {
        this.setData({
          showMoreDate: true
        })
      }
    },
  }
})
