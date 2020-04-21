const util = require("../../../utils/util.js");
let prop;
var sortTypeParam = 3
var pageParam = 1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    setimgon: "",
    popupShow: false,
    recommendInfo:{},
    recommendList:[]
  },

  // popup的js
  arrowmarkRotate: function() {
    this.setData({
      setimgon: "",
    });
  },
  onClose() {
    this.setData({
      popupShow: false,
    });
  },
  comprehensiveRanking: function() {
    wx.pageScrollTo({
      selector: ".near_shop_filtrate_bar"
    })
    this.setData({
      setimgon: "setimgon",
      popupShow: true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('prop', function(data) {
      prop = data
      console.log(prop)
      util.we_request({ //店铺推荐
        "method": util.config.CATEGORYRECOMMENDSHOPS,
        "shop_category_id": prop.id
      }, res => {
        that.setData({
          recommendInfo: res.data.data
        })
        console.log(res.data.data)
      })
      util.we_request({ //店铺列表
        "method": util.config.CATEGORYSHOPS,
        "shop_category_id": prop.id,
        "sort_type": sortTypeParam,
        "page": pageParam,

      }, res => {
        that.setData({
          recommendList: res.data.data
        })
        console.log(res.data.data)
      })
    })
  },

  toshopByYou(){
    wx.navigateTo({
      url: `../takeoutshop/takeoutshop?shopId=${this.data.recommendInfo.id}`,
    })
  },

  toshop(event){
    console.log("分类页去店铺详情", event.currentTarget.dataset.id)
    wx.navigateTo({
      url: `../takeoutshop/takeoutshop?shopId=${event.currentTarget.dataset.id}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: prop.title
    })
  },
})