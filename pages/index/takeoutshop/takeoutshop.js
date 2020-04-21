const app = getApp();
const util = require("../../../utils/util");
const computedBehavior = require('miniprogram-computed')
var isimgTabNum = 1;
var isgoodTabNum = 1;
var commentlist = [];
var page = 1;
var _shopid = 0;
var attrNameArr = [];
var skuitem;
var skuArr = [];
var skuStr = "";
var _popupPrice = 0;
var index;
var idx;
var _goodsid;
var _skuid;
var _shopinfo;
var _carList;
var _carBtnStatus = false;
var goodsSkusItem = [];
var _newuserCoupons = [];
var self_pick = 1; // 1支持自取，2不支持自取
var _costAll = 0;
var orderListParam = [];
Component({
  behaviors: [computedBehavior],
  properties: {
    shopId: Number
  },
  computed: {
    cost_com(data) {
      // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
      // 这个函数的返回值会被设置到 this.data.sum 字段中
      return data.cost > 0 ? data.cost : 0
    },
  },
  data: {
    windowHeight: 0,
    swiperTitle: [{
      text: "点菜",
      id: 1
    }, {
      text: "评价",
      id: 2
    }, {
      text: "商家",
      id: 3
    }],
    shopinfo: [],
    currentPage: 0, //默认哪个tab
    selected: 0,
    howMuch: 12,
    cost: 0,
    pullBar: false,
    istrue: false,
    buyproNum: 0,
    starValue1: 3,
    starValue2: 4,
    active: 1, //商家评价内的灰色tab
    commentlist: [],
    goodsList: [],
    carList: [],
    skuList: [],
    carNum: 0,
    commentLength: 0,
    isHideLoadMore: false,
    scrollheight: 0,
    shop_collected: 0,
    isshowSku: false,
    radio: '1',
    popupPrice: 0,
    minusTips: "",
    carBtnStatus: false,
    numShow:'', //购物车sku数量
  },

  methods: {
    onLoad: function(option) {
      app.globalData.allShopCarList = []
      // console.log(option)
      // const eventChannel = this.getOpenerEventChannel()
      // eventChannel.on('toShopInfo', data => {
      //   orderListParam = data.data
      // })
      // console.log("orderListParam", orderListParam)
      console.log(option)
      _shopid = option.shopId
      console.log("_shopid", _shopid)
      this.getGoodsList() //商品列表
      this.getShopInfo(res => { //店铺详情
        this.getScrollView() //获取ScrollView高度
        this.getCarList() //获取购物车
      })
      this.getComment() //评论
    },

    //携带总金额，跳转到订单页
    toOrder() {
      _shopinfo.delivery_order_amount
      console.log("_costAll", _costAll)
      for (let item of _carList) {
        if (!item.goods_status) {
          this.setData({
            error: `请先删除无效商品`
          })
          return
        }
      }
      if (_costAll >= parseFloat(_shopinfo.delivery_order_amount) && _costAll != 0) {
        // console.log("进来跳转_costAll", _costAll)
        // console.log("进来跳转_shopinfo.delivery_order_amount", parseFloat(_shopinfo.delivery_order_amount))
        wx.navigateTo({
          url: `/pages/order/submit/submit`,
          success: function(res) {
            let cart_ids = []
            for (let i of _carList) {
              cart_ids.push(i.cart_id)
            }
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('comeCarPage', {
              cart_ids: cart_ids, //购物车id数组
              shop_id: _shopinfo.shop_id //店铺id
            })
          }
        })
      } else {
        console.log("弹出提示")
        this.setData({
          error: `起送价${parseFloat(_shopinfo.delivery_order_amount)}元`
        })
      }
    },

    //更改选项方法
    onChangeShowState(e) {
      let _popupPrice = 0;
      idx = e.currentTarget.dataset.idx;
      index = e.currentTarget.dataset.index;
      goodsSkusItem = e.currentTarget.dataset
      console.log("goodsSkusItem", goodsSkusItem)
      for (let i in skuitem.goods_skus_key[idx].attr_list) {
        if (index == i) { //点击该按钮设置选中状态和获取key
          skuitem.goods_skus_key[idx].attr_list[i].select = true
          skuArr[idx] = skuitem.goods_skus_key[idx].attr_list[i].sku_info_id
        } else {
          skuitem.goods_skus_key[idx].attr_list[i].select = false
        }
      }
      skuStr = skuArr.join("-") //把数组里的每个属性值拼接成组合键
      console.log("skuStr", skuStr)
      for (let i in skuitem.goods_skus) { //根据组合键查询价钱和拿skuid
        if (skuitem.goods_skus[i].goods_skus_key == skuStr) {
          _popupPrice = skuitem.goods_skus[i].sku_sale_price
          if (skuitem.goods_skus[i].sku_stock > 0 || skuitem.goods_skus[i].sku_stock == -9999) {
            _skuid = skuitem.goods_skus[i].goods_sku_id
            _carBtnStatus = false
          } else {
            _carBtnStatus = true
          }
          break;
        }
      }
      this.setData({
        carBtnStatus: _carBtnStatus,
        skuList: skuitem,
        popupPrice: _popupPrice
      })
    },

    // 显示sku层
    showSku(e) {
      skuArr = []
      let _popupPrice = 0;
      index = e.currentTarget.dataset.index;
      skuitem = this.data.goodsList[this.data.selected].category_goods[index]
      _goodsid = this.data.goodsList[this.data.selected].category_goods[index].goods_id //拿goodsid
      console.log(skuitem.goods_skus_key)

      for (let i in skuitem.goods_skus_key) {
        console.log('skuitem.goods_skus_key', skuitem.goods_skus_key)
        console.log('skuitem.goods_skus_key[i]', skuitem.goods_skus_key[i])
        skuitem.goods_skus_key[i].attr_list[0].select = true
        skuArr.push(skuitem.goods_skus_key[i].attr_list[0].sku_info_id)
      }
      skuStr = skuArr.join("-") //把数组里的每个属性值拼接成组合键
      console.log("skuStr", skuStr)
      for (let i in skuitem.goods_skus) { //循环sku
        if (skuitem.goods_skus[i].goods_skus_key == skuStr) { //判断用户选中哪个sku
          _popupPrice = skuitem.goods_skus[i].sku_sale_price //拿sku价钱
          if (skuitem.goods_skus[i].sku_stock > 0 || skuitem.goods_skus[i].sku_stock == -9999) { //看是否有库存
            _skuid = skuitem.goods_skus[i].goods_sku_id //拿skuid
            console.log("skuStr:", skuStr)
            console.log("_skuid:", _skuid)
            _carBtnStatus = false
          } else {
            _carBtnStatus = true //无货，禁用购物车按钮
          }
          break;
        }
      }
      this.setData({
        carBtnStatus: _carBtnStatus,
        isshowSku: true,
        skuList: skuitem,
        popupPrice: _popupPrice
      });
    },
    //关闭图层
    onClose() {
      util.we_getStorage('goodsList', res => {
        this.setData({
          goodsList: res.data,
          isshowSku: false
        });
      })
    },

    //打电话
    makePhoneCall() {
      wx.makePhoneCall({
        phoneNumber: this.data.shopinfo.contact_information //仅为示例，并非真实的电话号码
      })
    },

    // 获取购物车
    getCarList() {
      util.we_request({
        "method": util.config.SHOPCARTLIST,
        "shop_id": _shopid || 10086
      }, res => {
        _costAll = 0
        let _minusTips = "请添加商品到购物车";
        let _cost = 0;
        let _carNum = 0;
        let _whatbuyCost = 0;
        let _minusCost = 0;
        let _takeoutShopCoupons = _shopinfo.takeout_shop_coupons.sort(util.compare('consume_reduce')); //排序，把优惠力度最大排最后
        _carList = res.data.data;
        for (let item of _carList) { //循环计算购物车总价和数量
          if (item.goods_status) {
            console.log("商品状态为1")
            _costAll += parseFloat(item.goods_sku.sku_sale_price * item.goods_amount)
            _cost += parseFloat(item.goods_sku.sku_sale_price * item.goods_amount)
            _carNum += item.goods_amount
          } else {
            item.goods_sku = {}
            item.goods_sku.sku_sale_price = '无效商品，请删除'
            console.log("商品状态为0")
          }
        }

        console.log("_cost", _cost)

        if (_takeoutShopCoupons.length) { //是否有优惠券
          console.log(_takeoutShopCoupons)
          if (!_newuserCoupons.length) {
            console.log("有优惠券并没有新用户，进来了准备循环拿新用户券")
            for (let i in _takeoutShopCoupons) {
              if (_takeoutShopCoupons[i].coupon_type == 2) {
                _newuserCoupons = _takeoutShopCoupons.splice(i, 1)
                break;
              }
            }
          }

          console.log("_newuserCoupons", _newuserCoupons)
          console.log("_takeoutShopCoupons", _takeoutShopCoupons)
          if (_shopinfo.is_new_user && _newuserCoupons.length) { //是新用户
            console.log("能用首单优惠券", _newuserCoupons)
            _minusTips = '已' + _newuserCoupons[0].coupon_title;
            if (_costAll > _newuserCoupons[0].consume_reduce) { //金额大于首单优惠券金额
              _cost -= parseFloat(_newuserCoupons[0].consume_reduce)
            } else if (0 < _cost && _cost < _newuserCoupons[0].consume_reduce && _carList.length > 0) { //大于0并小于首单优惠券金额则收取0
              _cost = 0
            } else { //其余情况直接显示0
              _cost = 0
            }
          } else { //是老用户
            console.log("不能用首单优惠券", _newuserCoupons)
            // const _costConst = _cost
            // const _cost_const = JSON.parse(JSON.stringify(_cost))
            // console.log(_costConst)

            console.log("_takeoutShopCoupons", _takeoutShopCoupons)
            console.log("_costAll", _costAll)

            if (_costAll >= parseFloat(_takeoutShopCoupons[_takeoutShopCoupons.length - 1].consume_reach)) {
              _minusTips = `已${_takeoutShopCoupons[_takeoutShopCoupons.length - 1].coupon_title}`
              console.log("老用户超过最高满减", _minusTips)
              _cost -= parseFloat(_takeoutShopCoupons[_takeoutShopCoupons.length - 1].consume_reduce)
            } else if (_costAll < parseFloat(_takeoutShopCoupons[0].consume_reach)) {
              _minusTips = `再买${(parseFloat(_takeoutShopCoupons[0].consume_reach) - _costAll).toFixed(2)}减${parseFloat(_takeoutShopCoupons[0].consume_reduce)}`
              // console.log("不超过所有满减", _minusTips)
            } else {
              for (let i in _takeoutShopCoupons) {
                if (_costAll < _takeoutShopCoupons[i].consume_reach) {
                  _minusTips = `已减${parseFloat(_takeoutShopCoupons[i - 1].consume_reduce)}, 再买${(parseFloat(_takeoutShopCoupons[i].consume_reach) - _costAll).toFixed(2)}减${parseFloat(_takeoutShopCoupons[i].consume_reduce)}`;
                  _cost -= parseFloat(_takeoutShopCoupons[i - 1].consume_reduce)
                  break;
                }
              }
            }
          }
        }
        this.setData({
          minusTips: _minusTips,
          cost: _cost,
          carList: _carList,
          carNum: _carNum,
          numShow: _carList.length
        })
        console.log(22, this.data.numShow)
      })
    },
    //添加购物车
    addCar(e) {
      var index = e.currentTarget.dataset.index;
      let isone = e.currentTarget.dataset.isone;
      let _goods_amount = 1;
      if ('number' === typeof index) { //用户在购物车弹出层的加号增加数量
        const cartId = _carList[index].cart_id;
        _goods_amount = _carList[index].goods_amount + 1
        util.we_request({
          "method": util.config.UPDATECART,
          "cart_id": cartId,
          "goods_amount": _goods_amount,
        }, res => {
          this.getCarList()
        })
      } else { //用户点击选规格弹出层操作
          for (let item of _carList) {
            if (item.goods_status && item.goods_sku.id == _skuid) {
              _goods_amount = item.goods_amount + 1
              break
            }
          }
          if ('number' === typeof isone) {
            let goods = this.data.goodsList[this.data.selected].category_goods[isone]
            _goodsid = goods.goods_id //拿goodsid
            _skuid = goods.goods_skus[0].goods_sku_id
          }
          util.we_request({
            "method": util.config.ADDCART,
            "goods_id": _goodsid,
            "goods_sku_id": _skuid,
            "goods_amount": _goods_amount
          }, res => {
            this.getCarList()
          })

      }
    },
    //清空购物车
    deleteAllcar() {
      util.we_request({
        "method": util.config.EMPTYCART,
        "shop_id": _shopid || 10086,
      }, res => {
        this.getCarList()
      })
    },
    //减购物车
    deleteCar(e) {
      var index = e.currentTarget.dataset.index;
      let _goods_amount = 1;
      const cartId = _carList[index].cart_id;

      if (_carList[index].goods_status) {
        console.log("更新购物车")
        _goods_amount = _carList[index].goods_amount - 1
        util.we_request({
          "method": util.config.UPDATECART,
          "cart_id": cartId,
          "goods_amount": _goods_amount,
        }, res => {
          this.getCarList()
        })
      } else {
        console.log("删除购物车")
        util.we_request({
          "method": util.config.DELETECART,
          "cart_id": cartId,
        }, res => {
          this.getCarList()
        })
      }
    },

    //滚动到底部触发
    commentScrollLower(e) {
      ++page
      this.getComment()
    },

    // 查询评论
    getComment(e) {
      util.we_request({
        "method": util.config.SHOPCOMMENT,
        "shop_id": _shopid || 10086,
        "image_type": isimgTabNum,
        "comment_type": 0,
        "page": page
      }, res => {
        if (res.data.data.length) {
          commentlist = commentlist.concat(res.data.data)
          this.setData({
            commentlist: commentlist,
            isHideLoadMore: false
          })
        } else {
          this.setData({
            isHideLoadMore: true
          })
        }
      })
    },
    //更改tab，选择是否有图
    isimgChange(e) {
      page = 1;
      commentlist = [];
      isimgTabNum = ++e.detail.index
      this.getComment()
    },
    //到时优化二级tab选项
    // isgoodChange(e) {
    //   isgoodTabNum = ++e.detail.index
    //   this.getComment()
    // },

    //获取店铺信息
    getShopInfo(cb) {
      util.we_request({
        "method": util.config.SHOPDETAIL,
        "shop_id": _shopid || 10086
      }, res => {
        _shopinfo = res.data.data.shop_info
        if (!_shopinfo.shop_service) { //不支持自取，把传给订单的self_pick参数改为0
          self_pick = 0
        }
        this.setData({
          shopinfo: _shopinfo,
          shop_collected: _shopinfo.shop_collected
        })
        typeof cb == "function" && cb(res);
        console.log("店铺详情：", this.data.shopinfo)
      })
    },

    //获取店铺商品
    getGoodsList() {
      util.we_request({
        "method": util.config.GETGOODSBYCATE,
        "shop_id": _shopid || 10086
      }, res => {
        util.we_setStorage('goodsList', res.data.data) //set缓存作用在于每次点击选规格不重新请求，直接拿当前店铺缓存
        this.setData({
          goodsList: res.data.data
        })
        console.log("商品列表：", this.data.goodsList)
      })
    },

    openDialog() {
      this.setData({
        istrue: true
      })
    },
    closeDialog() {
      this.setData({
        istrue: false
      })
    },
    pullBar() {
      this.setData({
        pullBar: !this.data.pullBar
      })
    },
    turnPage(e) {
      this.setData({
        currentPage: e.currentTarget.dataset.index
      })
    },
    turnTitle(e) {
      if (e.detail.source == "touch") {
        this.setData({
          currentPage: e.detail.current
        })
      }
    },
    turnMenu(e) {
      this.setData({
        selected: e.currentTarget.dataset.index
      })
    },

    //添加、删除收藏
    setCollect() {
      if (this.data.shop_collected) {
        util.we_request({
          "method": util.config.DELCOLLECT,
          "collect_ids": _shopinfo.collect_id
        }, res => {
          this.setData({
            shop_collected: 0
          })
        })
      } else {
        util.we_request({
          "method": util.config.COLLECT,
          "collect_type": 2, //(1商品2店铺)
          "module_type": 1, //(1外卖2商城3团购)
          "form_id": _shopid || 10086
        }, res => {
          _shopinfo.collect_id = res.data.data.collect_id
          this.setData({
            shop_collected: 1
          })
        })
      }
    },


    //获取ScrollView高度
    //异常
    getScrollView() {
      try {
        const windowHeight = wx.getSystemInfoSync()
        let query = wx.createSelectorQuery().in(this); // 创建SelectorQuery实例
        query.select('.header').boundingClientRect(); // 取出shop_view和header的高度
        query.select('.shop_view').boundingClientRect();
        query.exec((res) => { // 执行上面请求，结果按顺序存放于数组，在callback返回
          let scrollViewHeight = windowHeight - res[0].height - res[1].height;
          this.setData({
            scrollheight: scrollViewHeight,
          });
        });
      } catch (e) {
        console.log("同步获取高度的catch：", e)
      }
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
  }








})