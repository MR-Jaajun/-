// component/gropindex/gropindex.js
const app = getApp()
var http = require("../../utils/gethttp.js")
var config = require("../../utils/config.js")
const store = require("../../utils/store.js")
Component({
  /**
   * 组件的初始数据
   */
  data: {
    sort_type: '3',
    active: 0,
    shop_distance: '',
    value: "",
    banner: [], //轮播
    menuList: [],
    promotion: [], //拼团商品
    combo: [], //套餐
    option2: [{
        text: '综合排序',
        value: '3'
      },
      {
        text: '评分最高',
        value: '4'
      },
      {
        text: '人均高到低',
        value: '5'
      },
      {
        text: '人均低到高',
        value: '6'
      }
    ],
    value2: '3',
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.getLocation()

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
    // 获取定位
    getLocation() {
      wx.getLocation({
        type: 'gcj02',
        success: res => {
          app.globalData.location = res;
          store.setItem('location', res);
          http.header.latitude = res.latitude
          http.header.longitude = res.longitude
          this.getData(res)
          this.comboData(res)
        },
        fail: res => {
          wx.showModal({
            title: '定位失败，请重新定位',
            success: res => {
              console.log(res)
              if (res.confirm) {
                wx.navigateTo({
                  url: "/pages/getaddress/getaddress",
                })
              }
            }
          })
        }
      })

    },
    // 距离排序搜索
    oneTap(e) {
      let location = app.globalData.location
      this.setData({
        sort_type: e.currentTarget.dataset.id
      })
      this.comboData(location)
    },
    // 排序搜索
    twoChange(e) {
      let location = app.globalData.location
      this.setData({
        sort_type: e.detail
      })
      console.log(location)
      this.comboData(location)
    },
    // 跳转到通知页
    toNotify: function() {
      wx.navigateTo({
        url: '../../pages/index/notify/notify',
      })
    },
    /**
     * 进入搜索页
     */
    goSearch: function() {
      wx.navigateTo({
        url: '/pages/group/searchResult/searchResult'
      })
    },
    /**
     * 拼团专区
     */
    toPrefecture() {
      wx.navigateTo({
        url: '/pages/group/Prefecture/Prefecture'
      })
    },
    //商品详情
    goshopdetail(e) {
      // console.log(e)
      let id = JSON.stringify(e.currentTarget.dataset.id.goods_id)
      let price = JSON.stringify(e.currentTarget.dataset.id.goods_pink_price)
      let amount = JSON.stringify(e.currentTarget.dataset.id.goods_pink_amount) || 2
      console.log(id, price, amount, '00000')
      wx.navigateTo({
        url: `/pages/group/shopdetail/shopdetail?id=${id}&price=${price}&amount=${amount}`
      })
    },
    getData(location) {
      wx.request({
        url: http.baseURL2,
        method: "GET",
        data: {
          method: config.w_GroupIndex,
        },
        header: {
          'content-type': 'application/json',
          'token': app.globalData.mini_token,
          'deviceid': 'weapp',
          'devicetype': "3",
          'appversion': 'v0.1.20190730',
          'longitude': location.longitude,
          'latitude': location.latitude,
          'timestamp': app.globalData.timestamp,
          'signature': app.globalData.timestamp + "abc"
        },
        success: (res) => {
          let data = res.data.data
          this.setData({
            banner: JSON.parse(JSON.stringify(data.banner)),
            promotion: JSON.parse(JSON.stringify(data.promotion)),
            menuList: JSON.parse(JSON.stringify(data.menu))
          })
          // console.log(this.data.banner, res.data.data,'banner')
        }
      })
    },
    comboData(location) {
      wx.request({
        url: http.baseURL2,
        method: "GET",
        data: {
          "method": config.w_recommendGoods,
          "sort_type": this.data.sort_type,
        },
        header: {
          'content-type': 'application/json',
          'token': app.globalData.mini_token,
          'deviceid': 'weapp',
          'devicetype': "3",
          'appversion': 'v221',
          'longitude': location.longitude,
          'latitude': location.latitude,
          'timestamp': app.globalData.timestamp,
          'signature': app.globalData.timestamp + "abc"
        },
        success: (res) => {
          let data = res.data.data
          let data2 = []
          data.map(item => {
            item.shop_distance = Math.floor(item.shop_distance * 100) / 100
            data2.push(item)
          })
          this.setData({
            combo: JSON.parse(JSON.stringify(data2))
          })
        }
      })
    },

  },


})
