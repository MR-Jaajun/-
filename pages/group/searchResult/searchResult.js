const store = require("../../../utils/store.js")
var http = require('../../../utils/gethttp.js');
var config = require('../../../utils/config.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    sort_type: "3",
    contentShow: true,
    hotSearchList: [], //热门搜索
    historyList: null,
    historyarr: [], //历史纪录
    setimgon: "",
    popupShow: false,
    value2: "",
    goods_package_list: [], //套餐
    goods_voucher_list: [], //代金券商品
    resData:[],//店铺数据
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
  // 综合排序搜索
  twoChange(e) {
    this.setData({
      sort_type: e.detail
    })
    this.searchGet()
  },
  // 距离销量排序搜索
  oneTap(e) {
    this.setData({
      sort_type: e.currentTarget.dataset.id
    })
    this.searchGet()
  },

  onSearch() {
    console.log('88888')
  },

  onChange(e) {
    this.setData({
      value: e.detail
    });
  },

  onClick(e) {
    let item = this.data.value;
    if (this.data.historyarr.indexOf(item) == -1 && this.data.value != '') {
      this.data.historyarr.push(item)
    }
    if (this.data.historyarr.length > 8) {
      this.data.historyarr.shift();
    }
    store.setItem("historyList", this.data.historyarr)
    let arr = this.data.historyarr
    this.setData({
      historyList: arr
    })
    this.searchGet()
  },
  // 点击搜索
  searchGet() {
    wx.request({
      url: http.baseURL2,
      method: "GET",
      data: {
        keyword: this.data.value,
        sort_type: this.data.sort_type,
        method: config.w_shopSearch
      },
      header: http.header,
      success: (res) => {
        if (res.data.status == 1) {
          const arr = []
          const arr2 = []
          var search_type = ""
          const data = JSON.parse(JSON.stringify(res.data.data))
          console.log(data)
          data.map(a => {
            search_type = a.search_status
            a.goods_voucher_list.map(b => {
              b.shop_distanc = a.shop.shop_distance.toFixed(2)
              b.shop_title = a.shop.shop_title
              b.shop_id = a.shop.shop_id
              arr2.push(b)
            })
            a.goods_package_list.map(c => {
              c.shop_distanc = a.shop.shop_distance.toFixed(2)
              c.shop_title = a.shop.shop_title
              c.shop_id = a.shop.shop_id
              arr.push(c)
            })
          })
          this.setData({
            contentShow: false,
            resData:data,
            search_status: search_type,
            goods_package_list: arr,
            goods_voucher_list: arr2
          })
        }
      },
    })
  },
  // 点击历史记录与搜索记录
  SearchClick(e) {
    this.setData({
      value: e.currentTarget.dataset.name,
    })
    this.searchGet()
  },

  //请求热门搜索数据
  getHotSearchData: function() {
    http.request("GET", {
      method: "GroupIndex/shopSearch"
    }).then(res => {
      this.setData({
        hotSearchList: res.data.data,
      })
    })
  },
  historyList() {
    this.setData({
      historyList: wx.getStorageSync('historyList') || app.globalData.historyList,
      historyarr: wx.getStorageSync('historyList') || app.globalData.historyList
    })
  },

  goshopinfo(e){
    // console.log(e.currentTarget.dataset.id,"shop_id")
    let id = JSON.stringify(e.currentTarget.dataset.id)
     wx.navigateTo({
       url: `/pages/group/shopinfo/shopinfo?id=${id}`
     })
  },


  /**** */
  _arrowmarkRotate() {
    this.setData({
      setimgon: "",
    });
  },
  _onClose() {
    this.setData({
      popupShow: false,
    });
  },
  _comprehensiveRanking() {
    if (this.data.popupShow === true) {
      this.setData({
        popupShow: false,
      })
    } else {
      wx.pageScrollTo({
        selector: ".near_shop_filtrate_bar"
      })
      this.setData({
        setimgon: "setimgon",
        popupShow: true,
      })
    }
  },
  /**** */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHotSearchData()
    this.historyList()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
