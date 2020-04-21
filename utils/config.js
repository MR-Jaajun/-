const config = {
  // 外卖
  w_getSlider: "Home/getSlider", //首页轮播促销
  w_recommendData: "Home/recommendData", //首页推荐
  LOGIN: 'WechatLogin/getToken', //获取TOKEN
  BINDMOBILE: 'WechatLogin/bindMobile', // 绑定新手机
  SENDSMS: 'Common/sendSms', // 获取验证码
  GETBANNER: "TakeoutIndex/getSlider", //获取banner和menu
  NEARBYSHOP: "TakeoutIndex/nearbyShops", // 附近商家
  RecommendShops: "TakeoutIndex/categoryRecommendShops", //分类店铺推荐
  SHOPDETAIL: "TakeoutShop/shopDetail", //店铺详情
  SHOPCOMMENT: "TakeoutShop/shopComment", //店铺评价
  COLLECT: "CustomUser/collect", //添加，删除收藏
  GETGOODSBYCATE: "TakeoutShop/getGoodsByCate", //获取店铺商品
  SEARCHGOODS: "TakeoutShop/searchGoods", //店铺内搜索
  SHOPCARTLIST: "TakeoutShop/shopCartList", //购物车列表
  ADDCART: "TakeoutShop/addCart", //添加购物车
  SAFETYARCHIVE: "TakeoutShop/safetyArchive", //安全档案
  EMPTYCART: "TakeoutShop/emptyCart", //清空购物车
  DELETECART: "TakeoutShop/deleteCart", //删除购物车
  UPDATECART: "TakeoutShop/updateCart", //更新购物车
  CONFIRMORDER: "TakeoutOrder/confirmOrder", //确认订单
  CREATEORDER: "TakeoutOrder/createOrder", //创建订单
  PAYORDER: "TakeoutOrder/payOrder", //订单支付
  ORDERPAYLIST: "TakeoutOrder/orderPayList", //外卖订单支付方式
  ORDERLIST: "TakeoutOrder/orderList", //用户订单列表
  ORDERDETAIL: "TakeoutOrder/orderDetail", //用户订单详情
  CANCELORDER: "TakeoutOrder/cancelOrder", //用户取消订单
  DELETEORDER: "TakeoutOrder/deleteOrder", //用户删除订单
  CONFIRMRECEIVE: "TakeoutOrder/confirmReceive", //用户确认收货
  AGAINORDER: "TakeoutOrder/againOrder", //再来一单
  REMINDORDER: "TakeoutOrder/remindOrder", //用户催单
  ORDERREFUND: "TakeoutOrder/orderRefund", //申请退款
  IMAGEUPLOAD: "Common/imageUpload", //上传图片
  ORDEREVALUATE: "TakeoutOrder/orderEvaluate", //订单评价
  CATEGORYRECOMMENDSHOPS: "TakeoutIndex/categoryRecommendShops", //分类店铺推荐
  CATEGORYSHOPS: "TakeoutIndex/categoryShops", //分类店铺列表
  RECOMMENDSHOPS: "TakeoutIndex/recommendShops", //推荐店铺
  IGNORERECOMMEND: "TakeoutIndex/ignoreRecommend", //忽略推荐
  OPTIMIZESHOPS: "TakeoutIndex/optimizeShops", //为你优选(更多)
  ACTIVITYDETAIL: "TakeoutIndex/activityDetail", //活动详情
  ACTIVITYDETAILSHOPS: "TakeoutIndex/activityDetailShops", //活动详情店铺
  SELFSERVICESHOPS: "TakeoutIndex/selfServiceShops", //到店自取(更多)
  SHOPSORTLABELS: "TakeoutIndex/shopSortLabels", //附近商家搜索标签
  SEARCH: "TakeoutIndex/search", //外卖搜索
  CARTLIST: "TakeoutIndex/cartList", //全局购物车列表
  REMOVECART: "TakeoutIndex/removeCart", //全局购物车移除

  //jiajun
  GETUSERINFO: 'CustomUser/getUserInfo', //用户信息,
  SETUSERINFO: "CustomUser/setUserInfo", //修改用户信息
  COLLECTLIST: "CustomUser/collectList", //收藏列表
  BEANLIST: "CustomUser/beanList", //小哥豆明细
  BALANCEAMOUNT: "CustomUser/balanceAmount", //余额明细
  USERMESSAGE: "CustomUser/userMessage", //用户消息
  MESSAGELIST: "CustomUser/messageList", //消息列表
  ADDRESSLIST: "CustomAddress/addressList", //地址列表
  ADDADDRESS: "CustomAddress/addAddress", //添加地址
  UPDATEADDRESS: "CustomAddress/updateAddress", //修改地址
  DELETEADDRESS: "CustomAddress/deleteAddress", //删除地址
  GROUPLIST: "Commission/groupList", //我的团队列表
  MYPROFIT: "Commission/myProfit", //我的收益
  CASHLIST: "Commission/commissionDepositCashList", //提现列表
  FEEDBACKPROBLEM: "Common/feedbackProblem", //反馈问题
  COMMONPROBLEM: "Common/commonProblem", //常见问题
  DELCOLLECT: "CustomUser/delCollect", //删除收藏

  //商城
  w_orderList: "MallOrder/orderList", //商城订单列表
  w_orderDetail: "MallOrder/orderDetail", //用户订单详情
  w_remindOrder: "MallOrder/remindOrder", //提醒发货
  w_cancelOrder: "MallOrder/cancelOrder", //用户取消订单
  w_deleteOrder: "MallOrder/deleteOrder", //用户删除订单
  w_orderComment: "MallOrder/orderComment", //商品评价


  //团购
  w_GroupIndex: "GroupIndex/index", //团购头部数据
  w_recommendGoods: "GroupIndex/recommendGoods", //团购推荐专区
  w_topSearch: "GroupIndex/topSearch", //热门搜索
  w_shopSearch: "GroupIndex/shopSearch", //全局搜索
  w_goodsCategory: "GroupPromotion/goodsCategory", //拼团商品分类
  w_goodsDetail: "GroupShop/goodsDetail", //商品详情
  w_goodsList: "GroupPromotion/goodsList", //拼团商品列表
  w_shopDetail: "GroupShop/shopDetail", //店铺详情
  w_commentType: "GroupShop/commentType", //评价分类
  w_commentList: 'GroupShop/commentList', //店铺评价
  w_createOrder: 'GroupOrder/createOrder', //创建订单
  f_COUPONSLIST: "GroupOrder/orderList", //团购优惠券
  f_orderDetail: "GroupOrder/orderDetail", //订单详情
  f_cancelOrder: "GroupOrder/cancelOrder", //取消订单
  f_deleteOrder: "GroupOrder/deleteOrder", //删除订单
  f_upload: "Common/imageUpload", //上传图片
  f_orderComment: "GroupOrder/orderComment",
  f_orderRefund: "GroupOrder/orderRefund", //申请退款
  f_orderRefundDetail: "GroupOrder/orderRefundDetail", //退款详情
  f_collectList: "GroupIndex/collectList", //团购收藏列表
  f_delCollect: "CustomUser/delCollect", //团购删除收藏
  f_commentDetail: "GroupOrder/commentDetail", //评价详情

  //商城
  f_mallindex: "MallIndex/index"
}
module.exports = config;