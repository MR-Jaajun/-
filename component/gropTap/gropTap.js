// component/gropTap/gropTap.js
const app = getApp()
const util = require("../../utils/util.js")
Component({
  /**
   * 组件的初始数据
   */
  data: {
    //底部导航
    active: 0,
    active2: 0,
    showmeau: false,
    heights: "",
    _top: "",
    _right: ""
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log(app)
      let _top = app.globalData.h * 2;
      let _left = app.globalData.w * 2;
      this.setData({
        heights: _top,
        _top: _top * 0.8,
        _right: _left - 168
      })
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
    //显示更多
    showMore() {
      this.data.showmeau = !this.data.showmeau;
      this.setData({
        showmeau: this.data.showmeau,
      })
    },
    //关闭
    onClose() {
      this.setData({
        showmeau: false,
        active: this.data.active2
      });

    },
    onChange(event) {
      // console.log(event.detail);
      this.setData({
        active2: this.data.active,
        active: event.detail
      })
      // console.log(this.data.active, this.data.active2)
      //组件传值
      this.triggerEvent('getIndex', event.detail)
    },
    //去我的收藏
    toCollect() {
      wx.navigateTo({
        url: './groupCollect/groupCollect',
      })
      this.setData({
        showmeau: false
      })
    },
    myCard() {
      this.setData({
        showmeau: false,
        active: this.data.active2
      })
    }
  },


})