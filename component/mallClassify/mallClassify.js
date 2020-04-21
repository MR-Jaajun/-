// pages/mall/mall.js
const app = getApp()
const http = require("../../utils/gethttp.js")

Component({

  data: {
    active: 0,
    sidebarArr: ["食品", "一级分类", "一级分类", "一级分类"],
    contentArr: []
  },

  lifetimes: {
    attached: function() {
      this.shopCategory()
    },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() {},

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {},
    hide: function() {},
    resize: function() {},
  },

  methods: {
    //一级分类 /api/MallIndex/shopCategory
    shopCategory() {
      http.request('GET', {
        method: "MallIndex/shopCategory"
      }).then(res => {
        console.log(res.data, '商城分类')
        this.setData({
          sidebarArr: res.data.data,
          contentArr: res.data.data[0].category_children
        })

      })
    },
    onChange(e) {
      console.log(e.currentTarget.dataset.arr)
      this.setData({
        active: e.detail,
        contentArr: e.currentTarget.dataset.arr
      })
    },
    toMallList(e) {
      let str = e.currentTarget.dataset.title;
      // console.log(e.currentTarget.dataset)
      wx.navigateTo({
        url: './mallList/mallList?title=' + str,
      })
    },
  }

})