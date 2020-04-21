const util = require("../../utils/util.js")
const app = getApp()
var thisLocation = 0
var isload = true
var allList={}
Component({
  options: {
    addGlobalClass: true, // 配置能接受app.wxss
  },
  lifetimes: {
    attached: function() {
      // 目的让用户切换底部栏回来不触发
      if (isload){
        this.behavGetList()
        isload = true
      }
      else{
        this.setData({
          bannerList: allList.bannerList,
          menuList: allList.menuList,
          nearbyShopsList: allList.nearbyShopsList,
          recommendShopsList: allList.recommendShopsList,
          markers: allList.markers
        })
      }
    },
    moved: function () {},
    detached: function () {
      isload = false
      allList.bannerList = this.data.bannerList
      allList.menuList = this.data.menuList
      allList.nearbyShopsList = this.data.nearbyShopsList
      allList.recommendShopsList = this.data.recommendShopsList
      allList.markers = this.data.markers
    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {
      console.log('show_thisLocation', thisLocation)
      console.log('show_app.globalData.location', app.globalData.location)
      if (thisLocation.latitude !== app.globalData.location.latitude){
        this.behavGetList()
      }
    },
    hide: function () { 
      thisLocation = app.globalData.location
      console.log('hide_thisLocation', thisLocation)
    },
    resize: function () {},
  },

  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    bannerList: [],
    menuList: [],
    nearbyShopsList: [],
    recommendShopsList: [],
    markers:''
  },

  /**
   * 组件的方法列表
   */
  methods: {



    behavGetList(){
      let localStr = '';
      if (app.globalData.location.latitude) {
        localStr = app.globalData.location.latitude + ',' + app.globalData.location.longitude
        this.getBannerMenu();
        this.getNearbyShops();
        this.getShops();
      } else {
        util.getLocationProm().then(() => {
          this.getBannerMenu();
          this.getNearbyShops();
          this.getShops();
        })
      }
      console.log('app.globalData.addressTitle', app.globalData.addressTitle)
      util.qqmapsdk.reverseGeocoder({
        //位置坐标，默认获取当前位置，非必须参数
        location: localStr || '', //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
        // get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
        success: res => { //成功后的回调
          this.setData({ //设置markers属性和地图位置poi，将结果在地图展示
            markers: app.globalData.addressTitle || res.result.formatted_addresses.recommend
          });
          app.globalData.city = res.result.address_component.city
          console.log("QQ地图返回:", res);
        },
      })
    },

    //去搜索页
    toSearchPage() {
      wx.navigateTo({
        url: `/pages/index/searchresult/searchresult`,
      })
    },

    //去店铺详情
    toshop(event) {
      console.log("外卖主页去店铺详情", event.currentTarget.dataset.id)
      wx.navigateTo({
        url: `../takeoutshop/takeoutshop?shopId=${event.currentTarget.dataset.id}`,
      })
    },

    //获取优选、优惠、到店推荐店铺
    getShops() {
      util.we_request2({
        "method": util.config.RECOMMENDSHOPS
      }, res => {
        this.setData({
          recommendShopsList: res.data.data
        })
        console.log(res.data.data)
      })
    },

    // 获取banner
    getBannerMenu() {
      util.we_request2({
        "method": util.config.GETBANNER,
      }, res => {
        this.setData({
          bannerList: res.data.data.banner,
          menuList: res.data.data.menu
        })
      })
    },
    // 附近商家
    getNearbyShops() {
      util.we_request2({
          "method": util.config.NEARBYSHOP,
          "sort_type": 3
        },
        res => {
          this.setData({
            nearbyShopsList: res.data.data
          })
        })
    },

    //去详情页
    toShop(event) {
      // console.log(event.currentTarget.dataset.id)
      wx.navigateTo({
        url: `/pages/index/takeoutshop/takeoutshop?shopId=${event.currentTarget.dataset.id}`,
      })
    },

    // 去历史地址
    tohisaddress: function() {
      wx.navigateTo({
        url: '../../getaddress/historyaddress',
      })
    },

    //分类页
    toclassly: function(e) {
      // console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: 'takeoutclassify',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('prop', {
            id: e.currentTarget.dataset.id,
            title: e.currentTarget.dataset.title
          })
        }
      })
    },
    // 为你优选
    toYouxuan: function() {
      wx.navigateTo({
        url: '../youxuan/youxuan',
      })
    },
    // 到店自取
    toZiqu: function() {
      wx.navigateTo({
        url: '../ziqu/ziqu',
      })
    },
    // 通知页
    toNotify: function() {
      wx.navigateTo({
        url: '../notify/notify',
      })
    },
  }
})