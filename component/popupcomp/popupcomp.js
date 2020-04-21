// component/popupcomp.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    setimgon: "",
    popupShow: false,
    value: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
  }
})
