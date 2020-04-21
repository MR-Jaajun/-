// component/takeout-bar/takeoutbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  attached(){
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 2,
    icon: {
      normal: '/icon/souyea.png',
      active: '/icon/souyed.png'
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击tab
    onChange(event) {
      console.log("底部tab切换触发")
      // console.log(event.detail)
      // switch (event.detail) {
      //   case 1: {
      //     wx.redirectTo({
      //       url: '/pages/index/shoppingcart/shoppingcart'
      //     })
      //   }
      //   case 2: {
      //     wx.redirectTo({
      //       url: '/pages/order/orderlist'
      //     })
      //   }
      //   case 3: {
      //     wx.redirectTo({
      //       url: '/pages/index/moretab/moretab'
      //     })
      //   }
      // }
      this.setData({
        active: event.detail
      })
      //组件传页面
      this.triggerEvent('getactiveprop', event.detail)
    },
  }
})
