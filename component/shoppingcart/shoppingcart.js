// component/shoppingcart/shoppingcart.js
var shopindex = 0;
const util = require("../../utils/util.js")
const app = getApp()
var _allList = {}
// const _ = require('../../libs/lodash.min.js');
// import _ from '../../libs/core.min.js';
var listDeep = []
var carIds = []
Component({
  options: {
    addGlobalClass: true, // 配置能接受app.wxss
  },
  lifetimes: {
    attached: function() {
      //后来发现写死也没啥问题，代码先保存
      // const query = wx.createSelectorQuery()
      // query.select('.takebar_class >>> .van-tabbar').boundingClientRect()
      // query.exec(res => {
      //   this.setData({
      //     // bottomCss: res[0].height
      //   })
      // })
      
      if (app.globalData.allShopCarList.list) {
        this.setData({
          allList: app.globalData.allShopCarList
        })
      } else {
        this.getCarList()
      }
    },
    detached: function() {
      carIds = []
      app.globalData.allShopCarList = _allList
    },
  },

  /**
   * 组件的属性列表
   */
  properties: {},

  observers: {},

  /**
   * 组件的初始数据
   */
  data: {
    bottomCss: 50,
    isShowDelLine: true,
    allList: [],
    islogin: 2,
  },
  methods: {
    // 获取购物车
    getCarList() {
      util.we_request({
        "method": util.config.CARTLIST,
      }, res => {
        _allList.list = res.data.data
        listDeep = JSON.parse(JSON.stringify(res.data.data))
        for (let item of _allList.list) {
          item.check = true
          item.choose = item.goods_list.length
          for (let i of item.goods_list) {
            i.checked = true
            carIds.push(i.cart_id)
          }
        }

        _allList.status = true //全选选中状态
        _allList.allchoose = _allList.list.length //店铺选中个数

        for (let item of _allList.list) {
          this.setCoupon(item, parseFloat(item.gross_amount)) //判断优惠券
        }
        this.setData({
          allList: _allList
        })
      })
    },

    //节点加载判断优惠券
    setCoupon(thisShop, thisShopCost) {
      //计算优惠券逻辑开始
      thisShop.haveDiscount = 0
      let _newuserCoupons = []
      let _takeoutShopCoupons = thisShop.shop_coupon_list.sort(util.compare('consume_reduce')); //排序，把优惠力度最大排最后
      let _cost = thisShopCost
      let _costAll = thisShopCost
      if (_takeoutShopCoupons.length) { //是否有优惠券
        console.log('_takeoutShopCoupons', _takeoutShopCoupons)
        // if (!_newuserCoupons.length) { //有优惠券且没有新用户，进来循环拿新用户券

        for (let i in _takeoutShopCoupons) {
          if (_takeoutShopCoupons[i].coupon_type == 2) {
            _newuserCoupons = _takeoutShopCoupons.splice(i, 1)
          }
        }
        console.log('_newuserCoupons', _newuserCoupons)
        console.log('thisShopCost', thisShopCost)

        if (thisShop.is_new_user && _newuserCoupons.length) { //是新用户
          console.log("用首单优惠券", _newuserCoupons)
          thisShop.haveDiscount = parseFloat(_newuserCoupons[0].consume_reduce)
          if (_costAll > parseFloat(_newuserCoupons[0].consume_reduce)) { //金额大于首单优惠券金额
            _cost -= parseFloat(_newuserCoupons[0].consume_reduce)
          } else { //其余情况直接显示0
            _cost = 0
          }
        } else { //是老用户
          console.log("不能用首单优惠券", _takeoutShopCoupons)
          if (_costAll >= parseFloat(_takeoutShopCoupons[_takeoutShopCoupons.length - 1].consume_reach)) {
            thisShop.haveDiscount = parseFloat(_takeoutShopCoupons[_takeoutShopCoupons.length - 1].consume_reduce)
            _cost -= parseFloat(_takeoutShopCoupons[_takeoutShopCoupons.length - 1].consume_reduce)
          } else if (_costAll < parseFloat(_takeoutShopCoupons[0].consume_reach)) {
            thisShop.haveDiscount = 0
            console.log('22')
            _cost = _costAll
          } else {
            console.log('2233')
            for (let i in _takeoutShopCoupons) {
              if (_costAll < _takeoutShopCoupons[i].consume_reach) {
                thisShop.haveDiscount = parseFloat(_takeoutShopCoupons[i - 1].consume_reduce)
                _cost -= parseFloat(_takeoutShopCoupons[i - 1].consume_reduce)
                break;
              }
            }
          }
        }
      }
      thisShop.gross_amount = _cost
      //计算优惠券逻辑end
    },

    //某一店铺判断优惠券
    setShopCoupon(thisShop, idx) {
      let pric = 0
      for (let i of thisShop.goods_list) { //拿出用户选中商品的总价
        if (i.checked == true) {
          pric += parseFloat(i.sale_price * i.goods_amount)
        }
      }
      //计算优惠券逻辑开始
      // item.haveDiscount = 0
      let _newuserCoupons = []
      let _takeoutShopCoupons = JSON.parse(JSON.stringify(listDeep[idx].shop_coupon_list.sort(util.compare('consume_reduce')))); //排序，把优惠力度最大排最后
      let _cost = pric
      let _costAll = pric
      // console.log(111, _takeoutShopCoupons)
      if (_takeoutShopCoupons.length) { //是否有优惠券
        console.log(_takeoutShopCoupons)
        if (!_newuserCoupons.length) { //有优惠券且没有新用户，进来循环拿新用户券
          for (let i in _takeoutShopCoupons) {
            if (_takeoutShopCoupons[i].coupon_type == 2) {
              _newuserCoupons = _takeoutShopCoupons.splice(i, 1)
              break;
            }
          }
        }
        console.log('_newuserCoupons', _newuserCoupons)

        // console.log(44, _cost, _costAll)
        // console.log(44, thisShop.is_new_user)
        // console.log(44, _newuserCoupons)

        if (thisShop.is_new_user && _newuserCoupons.length) { //是新用户
          console.log("用首单优惠券", _newuserCoupons)
          let newc = parseFloat(_newuserCoupons[0].consume_reduce)
          if (_cost > newc) { //金额大于首单优惠券金额
            _cost -= newc
            thisShop.haveDiscount = newc
            console.log(22, _cost)
          } else if (newc >= _cost && _cost > 0.01) { //大于0并小于首单优惠券金额则收取0.01
            thisShop.haveDiscount = newc
            _cost = 0
            console.log('_cost1', _cost)
            console.log('_costAll1', _costAll)
          } else { //其余情况直接显示0
            console.log('_cost0', _cost)
            console.log('_costAll0', _costAll)
            _cost = 0
            thisShop.haveDiscount = 0
          }
        } else { //是老用户
          console.log("不能用首单优惠券", _takeoutShopCoupons)
          if (_costAll >= parseFloat(_takeoutShopCoupons[_takeoutShopCoupons.length - 1].consume_reach)) {
            thisShop.haveDiscount = parseFloat(_takeoutShopCoupons[_takeoutShopCoupons.length - 1].consume_reduce)
            _cost -= parseFloat(_takeoutShopCoupons[_takeoutShopCoupons.length - 1].consume_reduce)
          } else {
            for (let i in _takeoutShopCoupons) {

              if (_costAll >= parseFloat(_takeoutShopCoupons[_takeoutShopCoupons.length - 1].consume_reach)) {
                thisShop.haveDiscount = parseFloat(_takeoutShopCoupons[_takeoutShopCoupons.length - 1].consume_reduce)
                _cost -= parseFloat(_takeoutShopCoupons[_takeoutShopCoupons.length - 1].consume_reduce)
              } else if (_costAll < parseFloat(_takeoutShopCoupons[0].consume_reach)) {
                thisShop.haveDiscount = 0
                _cost = _costAll
              } else {
                for (let i in _takeoutShopCoupons) {
                  if (_costAll < _takeoutShopCoupons[i].consume_reach) {
                    thisShop.haveDiscount = parseFloat(_takeoutShopCoupons[i - 1].consume_reduce)
                    _cost -= parseFloat(_takeoutShopCoupons[i - 1].consume_reduce)
                    break;
                  }
                }
              }
            }
          }
        }
      }
      return _cost
      //计算优惠券逻辑end
    },

    //去店铺详情
    toshop(event) {
      let cart_ids = [];
      console.log("外卖主页去店铺详情", event.currentTarget.dataset.id)
      for (let i of _allList.list) {
        if (i.shop_id === event.currentTarget.dataset.id) {
          for (let p of i.goods_list) {
            if (p.checked === true) {
              cart_ids.push(p.cart_id)
            }
          }
          break;
        }
      }
      if (cart_ids.length) {
        wx.navigateTo({
          url: `/pages/order/submit/submit`,
          success: res => {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('comeCarPage', {
              cart_ids: cart_ids, //购物车id数组
              shop_id: event.currentTarget.dataset.id //店铺id
            })
          }
        })
      } else {
        this.setData({
          error: `未选中商品`
        })
      }
    },


    choosetrue(idx, pdx) { //idx 店铺id，pdx商品id
      console.log("choosetrue", _allList)
      let thisfdata = _allList.list[idx]

      carIds.push(thisfdata.goods_list[pdx].cart_id)
      console.log('carIds', carIds)

      thisfdata.goods_list[pdx].checked = true; //将商品选中状态改为true
      let pric = this.setShopCoupon(thisfdata, idx) //判断优惠券

        ++thisfdata.choose === thisfdata.goods_list.length ? (thisfdata.check = true) : ""; //选中商品数量先+1，再与该店铺商品数量比较，如相等就更改店铺选中状态

      thisfdata.check ?
        ++_allList.allchoose === _allList.list.length ?
        (_allList.status = true) :
        (_allList.status = false) :
        ""; //如店铺选中状态为true，选中店铺数量先+1，再与店铺数量比较，如果相等就更改全选选中状态为true

      thisfdata.gross_amount = pric
      this.setData({
        allList: _allList,
      })
    },
    choosefalse(idx, pdx) { //idx 店铺id，pdx商品id
      console.log("choosetrue", _allList)
      let thisfdata = _allList.list[idx]

      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          return this.splice(index, 1);
        }
      };
      carIds.remove(thisfdata.goods_list[pdx].cart_id); //移除指定商品的cart_id

      thisfdata.goods_list[pdx].checked = false; //将商品选中状态改为false
      let pric = this.setShopCoupon(thisfdata, idx) //判断优惠券
        --thisfdata.choose; //选中商品数量-1
      if (thisfdata.check) {
        //如果店铺是被选中的，更改店铺选中状态
        thisfdata.check = false;
        --_allList.allchoose; //并且选中店铺数量-1
      }
      _allList.status = false; //全选改为false
      // pric.allsum -= pric.list[idx].goods_list[pdx].sum; //商品总计价格变动
      // pric.allnum -= pric.list[idx].goods_list[pdx].num;

      thisfdata.gross_amount = pric
      this.setData({
        allList: _allList
      })
    },
    choose(event) {
      let idx = event.currentTarget.dataset.idx;
      let pdx = event.currentTarget.dataset.pdx;
      let pro = event.currentTarget.dataset.pro;
      // console.log(1, idx)
      // console.log(1, pdx)
      // console.log(1, pro)
      !pro.checked ?
        this.choosetrue(idx, pdx) :
        this.choosefalse(idx, pdx);
    },
    shoptrue(idx) {
      let fdata = this.data.allList
      fdata.list[idx].goods_list.forEach((pro, index) => {
        fdata.list[idx].goods_list[index].checked === false && this.choosetrue(idx, index); //循环店铺中的商品，先筛选出目前没选中的商品，给它执行choosetrue函数
      });
    },
    shopfalse(idx) {
      let fdata = this.data.allList;
      fdata.list[idx].goods_list.forEach((pro, index) => {
        fdata.list[idx].goods_list[index].checked === true && this.choosefalse(idx, index); //循环店铺中的商品，先筛选出目前被选中的商品，给它执行choosefalse函数
      });
    },
    shopchoose(event) {
      let fdata = this.data.allList;
      let idx = event.currentTarget.dataset.idx;
      !fdata.list[idx].check ? this.shoptrue(idx) : this.shopfalse(idx);
    },
    cartchoose() {
      let fdata = this.data.allList
      fdata.status = !fdata.status; //取反改变状态
      console.log(fdata.status)
      fdata.status ?
        fdata.list.forEach((item, idx) => this.shoptrue(idx)) :
        fdata.list.forEach((item, idx) => this.shopfalse(idx)); //根据取反后的状态进行相应的店铺按钮操作
      this.setData({
        allList: fdata
      })
    },
    add(pro) {
      pro.num++;
      pro.sum += pro.price;
      if (pro.checked) {
        this.data.allList.allnum++;
        this.data.allList.allsum += pro.price;
      }
    },
    reduce(pro) {
      if (pro.num === 1) return;
      pro.num--;
      pro.sum -= pro.price;
      if (pro.checked) {
        this.data.allList.allnum--;
        this.data.allList.allsum -= pro.price;
      }
    },
    calculate(pro) {
      let oldsum = pro.sum; //之前的总价
      let oldnum = oldsum / pro.price; //之前的数量
      pro.num = parseInt(pro.num);
      pro.num > 0 ? (pro.sum = pro.num * pro.price) : (pro.num = oldnum); //如果输入数量大于0，计算价格，否则返回之前的数量
      let diffsum = pro.sum - oldsum; //差价
      let diffnum = pro.num - oldnum; //差量
      if (pro.checked) {
        //如果商品被选中
        this.data.allList.allsum += diffsum; //计算总价
        this.data.allList.allnum += diffnum; //计算总量
      }
    },

    //编辑购物车
    editCar(e) {
      this.setData({
        isShowDelLine: parseInt(e.target.id) ? true : false
      })
    },

    deleteCar() {
      if (carIds.length) {
        let carStr = carIds.join(',')
        wx.showModal({
          title: `确定要删除这${carIds.length}商品吗?`,
          success: res => {
            if (res.confirm) {
              util.we_request({
                "method": util.config.REMOVECART,
                "cart_ids": carStr
              }, res => {
                this.getCarList()
              })
            }
          }
        })
      } else {
        this.setData({
          error: `未选中商品`
        })
      }
    }
  }
})