// component/gropindex/gropindex.js
const app = getApp()
const util = require("../../utils/util.js")
var http = require("../../utils/gethttp.js")
const store = require("../../utils/store.js")
Component({
  /**
   * 组件的初始数据
   */
  data: {
    couponslist: [],
    couponslist2: [],
    length1: "0", //代金券
    length2: "0", //套餐
    active: 0,

  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
  let mini_token = app.globalData.mini_token || store.getItem("mini_token")
      if (!mini_token) {
        wx.navigateTo({
          url: "/pages/zindex/zindex",
        })
      } else {
        this.getData(1)
        this.getData(2)
      }

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

    todetail(e) {
      let str = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: './lookCoupons/lookCoupons?order=' + str,
      })
    },
    //优惠券
    getData(type) {
      http.request("GET", {
        "method": util.config.f_COUPONSLIST,
        "status": 2,
        "order_type": type,
        "page": 1,
        "size": 200
      }).then(res => {
        let arr = res.data.data
        // console.log(res.data.data)
        arr.forEach(item => {
          item.goods.forEach(item2 => {
            item.codes = item2.verify_code
          })
        })
        if (type == 1) {
          this.setData({
            length1: arr.length,
            couponslist: arr
          })
        } else {
          this.setData({
            length2: arr.length,
            couponslist2: arr
          })
        }
      })
    },
    //切换
    changes(e) {
      console.log(e.detail)
      this.setData({
        active: e.detail.index
      })
      if (e.detail.index == 1) {
        this.getData(1)
      } else {
        this.getData(2)
      }
    }
  },

})
