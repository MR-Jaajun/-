const util = require("../../../../utils/util")
Page({
  data: {
    safetyArchiveList:[]
  },
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    util.we_request({
      "method": util.config.SAFETYARCHIVE,
      "shop_id": options.shopid
    },res=>{
      wx.hideNavigationBarLoading()
      this.setData({
        safetyArchiveList: res.data.data
      })
    })
  },
})