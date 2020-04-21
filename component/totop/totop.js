// component/totop/totop.js
const util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    totopProp: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _toTop: function() {
      util.we_pageScrollTo();
    },
  }
})