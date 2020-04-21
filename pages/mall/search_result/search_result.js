// pages/mall/search/search.js
import debounce from '../../../libs/debounce.js'; //函数防抖
var behavior = require('../../../utils/behavior');
var util = require('../../../utils/util');
var shopid = 0; //店铺id
Component({
  behaviors: [behavior.search],
  data: {
    isshowsearch: false,
    searchList: [],
    activeNames: ['0'],
    radio: '1',
    type:1,
    
  },
  observers: { //监听
  },

  methods: {
    //单选
    onChange(event) {
      this.setData({
        radio: event.detail
      });
      // console.log(event)
    },

    onClick(event) {
      const { name } = event.currentTarget.dataset;
      this.setData({
        radio: name
      });
    },
    //下拉
    onChange2(event) {
      this.setData({
        activeNames: event.detail
      });
    },
    //店铺
    shops(){
      this.setData({
        type:3
      })
    },
    //进入店铺
    toStore(){
      wx.navigateTo({
        url: '../store/store',
      })
    },
    
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