// pages/mall/mall.js
const app = getApp()
const config = require("../../utils/config.js")
const http = require("../../utils/gethttp.js")

Component({
  data: {
    text: "", //提交测试
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    menuList: [], //菜单
    pink_goods: [], //拼团商品
    scene_data: null,
    goods_list: [],
    time: null, //倒计时
    recommend: [],
  },

  lifetimes: {
    attached: function() {
      this.getData();
      this.getRecommend(1)
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
    //商城首页
    getData() {
      http.request('GET', {
        method: 'MallIndex/index'
      }).then(res => {
        // console.log(res.data.data, '商品首页')
        let {
          banner,
          menu,
          promotion: {
            pink_goods,
            seckill_goods: {
              scene_data,
              goods_list
            }
          }
        } = res.data.data
        console.log(menu)
        //倒计时
        let cutdown = null;

        if (scene_data) {
          let endtime = scene_data.scene_end_time;
          let moment = http.timestamp();
          console.log(moment)
          if (endtime * 1000 - moment > 0) {
            cutdown = endtime * 1000 - moment
          }
        }
        this.setData({
          background: banner,
          menuList: menu,
          pink_goods: pink_goods,
          scene_data: scene_data,
          goods_list: goods_list,
          time: cutdown ? cutdown : 1000
        })
      })
    },
    //推荐专区  /api/MallIndex/getRecommend
    getRecommend(page) {
      http.request('GET', {
        method: "/MallIndex/getRecommend",
        search_sort: 1,
        page: page,
        size: 5
      }).then(res => {
        console.log(res.data.data, '推荐专区')
        if (res.data.data.length > 0) {
          this.setData({
            recommend: this.data.recommend.concat(res.data.data)
          })
        } else {
          http.showtoast('已经没有更多的数据了', 'none')
        }

      })
    },
    //倒计时结束
    finished() {
      this.getData()
    },

    onChange(event) {
      console.log(event.detail);
      this.setData({
        active: event.detail
      }).then(res => {
        console.log(res.data.data)
      })
    },
    //跳转到分类商品
    toGoods(e) {
      let str = e.currentTarget.dataset.title
      let jid = e.currentTarget.dataset.jid
      console.log(e.currentTarget.dataset)
      wx.navigateTo({
        url: './goodsClassify/goodsClassify?title=' + str + "&jid=" + jid,
      })
    },
    //跳转到限时抢购列表
    toTimelimit() {
      wx.navigateTo({
        url: './timeLimit/timeLimit',
      })
    },
    //跳转到推荐专区列表
    toMallList() {
      let str = '推荐专区';
      // console.log(e.currentTarget.dataset)
      wx.navigateTo({
        url: './mallList/mallList?title=' + str,
      })
    },
    // 跳转到通知页
    toNotify: function() {
      wx.navigateTo({
        url: '../index/notify/notify',
      })
    },
    //跳转到拼团列表
    topinkList() {
      wx.navigateTo({
        url: './pinkList/pinkList',
      })
    },
    //跳转到商品详情
    todetail(e) {
      console.log(e.currentTarget.dataset.gid)
      let gid = e.currentTarget.dataset.gid;
      wx.navigateTo({
        url: './goodsDetail/goodsDetail?gid=' + gid,
      })
    }
  }

})