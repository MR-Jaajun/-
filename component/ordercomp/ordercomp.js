// 订单列表，用组件构造页面
const app = getApp();
const util = require("../../utils/util");
var orderid = 0
var itemtype = 0
var _orderList = [];
var behavior = require('../../utils/behavior')
Component({
  behaviors: [behavior.loadMore],//下拉更多, 包含data：page；method：scrollLower；
  options: {
    addGlobalClass: true, // 配置能接受app.wxss
  },
  properties: {},
  data: {
    time: '42',
    rmb: '3￥',
    type: '',
    types: '2',
    opacityitem: '',
    navheight: '',
    orderList: [],
    orderStatus: "",
    scrollTop: 0,
    toView: 'test',
  },
  lifetimes: {//异常，切换到订单回去主页，没有东西了
    attached: function() {
      //设置ScrollView高度
      const query = this.createSelectorQuery()
      query.selectViewport().scrollOffset()
      query.select('.zhezhao >>> .van-tabs__nav').boundingClientRect()
      query.exec(res => {
        console.log('res', res)
        let _scrollHeight = res[0].scrollHeight - res[1].height - 50
        this.setData({
          scrollHeight: _scrollHeight
        })
        this.getList()
      })
    },
  },
  methods: {

    tapMove: function (e) {
      console.log('scrollTop', this.data.scrollTop)
      this.setData({
        scrollTop: 0
      })
      console.log('scrollTop', this.data.scrollTop)
      // this.setData({
      //   toView: 'test',
      // })
      

    },

    //去评价
    toAppraise(e){
      wx.navigateTo({
        url: `/pages/order/order_appraise/order_appraise?orderid=${this.data.orderList[e.currentTarget.dataset.index].id}`,
      })
    },

    //获取订单列表
    getList(e) {
      this.setData({
        isHideLoadMore: true,
      })
      console.log('获取订单列表的参数', e)
      util.we_request({
        "method": util.config.ORDERLIST,
        "status": itemtype, //状态(0全部,1待付款,4待评价,6退款)
        "page": this.data.page, //页码
        // "size": 20 //每页数量
      }, res => {
        console.log('订单列表：', res.data.data)
        if (res.data.data.length) {
          if (e) {//e参数来自下拉刷新方法
            console.log("有参数就加载更多,")
            _orderList = _orderList.concat(res.data.data)
          } else {//点击删除，取消，确认收货等按钮
            console.log("无参数就更新当前页")
            _orderList = res.data.data
          }
          this.setData({
            orderList: _orderList,
            isHideLoadMore: false
          })
        } else {
          if (e) {//e参数来自下拉刷新方法
            this.data.page--
          }
          console.log('this.data.page', this.data.page)
          console.log("没有OrderList,显示没有更多")
          this.setData({
            isHideLoadMore: false,
          })
        }
      })
    },

    cancelOrder(e) { //取消订单
      util.we_request({
        "method": util.config.CANCELORDER,
        "order_id": this.data.orderList[e.currentTarget.dataset.index].id
      }, res => {
        wx.showToast({
          title: '订单已取消',
        })
        this.getList()
      })
    },

    delOrder(e) { //删除订单
      wx.showModal({
        title: '确定删除吗？',
        success: res => {
          if (res.confirm) {
            util.we_request({
              "method": util.config.DELETEORDER,
              "order_id": this.data.orderList[e.currentTarget.dataset.index].id
            }, res => {
              wx.showToast({
                title: '订单已删除',
              })
              this.getList()
            })
          }
        }
      })
    },

    topay(e) { //去支付页
      wx.navigateTo({
        url: `/pages/order/zhifu/zhifu`,
        success: res => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('toPayInfo', {
            data: this.data.orderList[e.currentTarget.dataset.index]
          })
        }
      })
    },

    confirmReceive(e) { //确定收货
      wx.showModal({
        title: '确定收货吗？',
        success: res => {
          if (res.confirm) {
            util.we_request({
              "method": util.config.CONFIRMRECEIVE,
              "order_id": this.data.orderList[e.currentTarget.dataset.index].id
            }, res => {
              this.getList()
            })
          }
        }
      })
    },

    toShop(e) { //再来一单
      util.we_request({
        "method": util.config.AGAINORDER,
        "order_id": this.data.orderList[e.currentTarget.dataset.index].id
      }, res => {
        console.log(this.data.orderList[e.currentTarget.dataset.index].shop_id)
        wx.redirectTo({
          url: `/pages/index/takeoutshop/takeoutshop?shopId=${this.data.orderList[e.currentTarget.dataset.index].shop_id}`,
        })
      })
    },
    
    toOrderInfo(e) {//去详情页
      wx.navigateTo({
        url: `/pages/order/dispatching/dispatching?orderid=${this.data.orderList[e.currentTarget.dataset.index].id}`,
      })
    },

    changeTab(e) {
      this.setData({
        page:1,
      })
      console.log("切换tab", e.detail.index)
      console.log("page", this.data.page)
      if (e.detail.index === 0) {
        itemtype = 0
      } else if (e.detail.index === 1) {
        itemtype = 1
      } else if (e.detail.index === 2) {
        itemtype = 4
      } else if (e.detail.index === 3) {
        itemtype = 6
      }
      this.getList()
    },

    goappraise() {
      wx.navigateTo({
        url: '/pages/order/appraise/appraise'
      })
    },

    // 退款成功页面
    refundtap_ok() {
      wx.navigateTo({
        url: '/pages/order/refunded/refunded'
      })
    },
    // 退款拒绝页面
    refundtap_ng() {
      wx.navigateTo({
        url: "/pages/order/refund_ng/refund_ng"
      })
    },

    // 回到顶部
    // ScrollTop: function(e) {
    //   wx.pageScrollTo({
    //     scrollTop: 0,
    //   })
    //   this.setData({
    //     curentPage: 1,
    //   })
    // },

    //滑到底部
    // scrollViewlower: function(e) {
    //   var page = this.data.curentPage += 1
    //   this.setData({
    //     curentPage: page,
    //   })
    // },
  }
})