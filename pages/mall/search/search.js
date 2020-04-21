// pages/mall/search/search.js
import debounce from '../../../libs/debounce.js'; //函数防抖
var behavior = require('../../../utils/behavior');
var util = require('../../../utils/util.js');
var shopid = 0; //店铺id
Component({
  behaviors: [behavior.search],
  data: {
    isshowsearch: false,
    searchList: [],
    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
  },
  observers: { //监听
  },

  methods: {
    // 删除历史记录
    close() {
      this.setData({
        dialogShow: true
      })
    },
    tapDialogButton(e) {
      console.log('dialog', e.detail)
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false
      })
    },
    //
    searchChange: debounce(function(e) {
      util.we_request({
        "method": util.config.SEARCHGOODS,
        "goods_title": e.detail,
        "shop_id": 10001
        // "shop_id": shopid
      }, res => {
        this.setData({
          searchList: res.data.data
        })
        console.log(this.data.searchList)
      })

      if (e.detail) {
        this.setData({
          isshowsearch: true
        })
      } else {
        this.setData({
          isshowsearch: false
        })
      }
    }, 300),
    onLoad: function(options) {
      shopid = parseInt(options.shopid)
    },
  },
});

