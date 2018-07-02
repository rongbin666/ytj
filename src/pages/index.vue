<template>
<div>
  <div class="page">
  <div class="page__bd">
    <div class="container1">
      <TabList :tab="cate_method"></TabList>
    </div>
    <div class="new-body">
      <div class="swiper-search">
        <div class="swiper">
          <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
            <div v-for="(item,index) in imgUrls" :key="index">
              <swiper-item>
                <img :src="item" class="slide-image" height="150" />
              </swiper-item>
            </div>
          </swiper>
        </div>
        <div class="search">
          <div class="weui-search-bar">
            <div class="weui-search-bar__form">
              <div class="weui-search-bar__box">
                <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                <input type="text" class="weui-search-bar__input" placeholder="搜索" bindtap="inputTyping" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu">
        <div class="section__ctn" v-for="(item,index ) in cate_src"  :key="index">
          <div class="image-title">
            <img class="section__image" :mode="item.mode" :src="item.picture">
            <div class="section__title">{{item.text}}</div>
          </div>
        </div>
      </div>
      <div class="tab-menu">
         <TabList :tab="sort_method"></TabList>
      </div>


      <div class="zan-panel">
        <div v-for="(item,index) in couponList" :key="item.goods_id" url="../detail/detail" bindtap="setCouponInfo" :data-index="index">
          <div class="card zan-card">
            <div class="zan-row">
              <div class="zan-col zan-col-6">
                <img class="product-image" :src="item.goods_pic" mode="aspectFit">
              </div>
              <div class="content zan-col zan-col-12">
                <div class="zan-card__detail-row">
                  {{item.goods_short_title}}
                </div>
                <div class="zan-card__detail-row">
                  <div class="zan-tag zan-tag--danger zan-tag--plain">券后价</div>￥{{item.new_place}}
                  <div class="zan-card__detail-row">现价￥{{item.goods_price}} 月销量{{item.goods_sale_num}}</div>
                </div>
              </div>
              <div class="zan-col zan-col-1 line">
              </div>
              <div class="zan-col zan-col-5 coupon">
                <div class="zan-card__detail-row coupon-price">￥{{item.coupon_amount}}</div>
                <div class="zan-card__detail-row coupon-text">优惠券</div>
                <div class="zan-card__detail-row coupon-info">查看详情</div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</div>
</div>
</template>

<script>
import TabList from "@/components/tab";
// const api = require('@/api/index');
import api from '@/api/index'
import { mapGetters } from 'vuex'

export default {
  components: {
      TabList
  },
  computed: {
    ...mapGetters([
      'topics',
    ])
  },  
  data() {
    return {
      inputShowed: false,
      inputVal: "",
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      couponList: [],
      inputContent: "",
      selectCategory: 0,
      sort: "commission_rate_desc",
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      cate_method: {
        list: [{
            id: '1',
            title: '全部'
          }, {
            id: '2',
            title: '女装'
          }, {
            id: '3',
            title: '男装'
          }, {
            id: '4',
            title: '鞋子'
          }, {
            id: '5',
            title: '箱包'
          }, {
            id: '6',
            title: '母婴'
          }, {
            id: '7',
            title: '内衣'
          }, {
            id: '8',
            title: '美妆'
          }, {
            id: '9',
            title: '配饰'
          }, {
            id: '10',
            title: '家居'
          }, {
            id: '11',
            title: '文体'
          }, {
            id: '12',
            title: '数码'
          }, {
            id: '13',
            title: '电器'
          }, {
            id: '14',
            title: '美食'
          }, {
            id: '15',
            title: '其他'
          }],
          selectedId: '1',
          scroll: true,
          height: 42,
      },    
      sort_method: {
        list: [{
            id: 'commission_rate_desc',
            title: '默认'
          }, {
            id: 'new',
            title: '最新'
          }, {
            id: 'sale_num',
            title: '销量'
          }, {
            id: 'price_asc',
            title: '价格'
          }, {
            id: 'commission_rate_descsign',
            title: '券额'
          }],
          selectedId: 'commission_rate_desc'
      },
      cate_src: [
        {
            mode: 'scaleToFill',
            text: '九块九',
            picture:require('@/assets/img/jkj.png')
          },
          {
            mode: 'scaleToFill',
            text: '20封顶',
            picture:require('@/assets/img/hot.png')
          },
          {
            mode: 'scaleToFill',
            text: '爆款推荐',
            picture:require('@/assets/img/bktj.png')
          },
          {
            mode: 'scaleToFill',
            text: '找优惠券',
            picture:require('@/assets/img/jkj.png')
          }
        ]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    binddivTap() {
      const url = "../logs/main";
      wx.navigateTo({ url });
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo;
            }
          });
        }
      });
    },
    getList(){
      // api.getList().then(res=>{
      //   console.log(res)
      // })
      api.getList((res)=>{
        res.data.forEach((item=>{
          item.new_place = item.goods_price  - item.coupon_amount;
          item.new_place = item.new_place.toFixed(2);
        }))
        this.couponList =  this.couponList.concat(res.data);
      })
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    }
  },
  onReachBottom(){
    this.getList();
  },
  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  }
};
</script>

<style>
/* pages/favour/favour.wxss */
.page {
  background: rgb(249, 249, 249);
  width: 100%;
}
.container1 {
   position: fixed;
   top: 0;
   z-index: 3; 
   height: 42px;
} 
.container1 .zan-tab__item {
  min-width: 40px !important;
}
.container1 .zan-tab__title {
  font-size: 11px !important;
  height: 42px !important;
}
.new-body {
   position: absolute;
   width: 100%;
}
.swiper-search {
  margin-top: 42px;
  height: 150px;
  position: relative;
  width: 100%;
}
.swiper {
  position: absolute;
  width: 100%;
  z-index: 1;
}
.search {
  position: absolute; 
  z-index:2;
  width: 80%; 
  margin-top: 15px;
  margin-left: 10%;
}
.weui-search-bar {
  padding: 0 !important;
  background-color: transparent !important;
  border-top: 0 !important;
  border-bottom: 0 !important; 
}
.weui-search-bar__form {
  border-radius: 200px !important;
}
.menu {
  margin-top: 10px;
  height: 74px;
  width: 100%;
}
.section__title {
  font-size: 11px;
  text-align: center;
  width: 50px;
  color: #666;
}
.section__image {
  width: 50px;
  height: 50px;
}
.section__ctn {
  float:left;
  width: 25%;
}
.image-title {
   margin-left: 15px; 
}
.tab-menu {
  margin-top: 5px;
  width: 100%;
}
.tab-menu .zan-tab__title {
  border-bottom: 0px !important;
  font-size: 11px !important;
}
.tab-menu .zan-tab__bd {
  border-top: 20rpx solid #e5e5e5 !important;
  border-bottom: 0 !important;
  background-color: rgb(249, 249, 249);
}
.card {
  border-top: 20rpx solid #e5e5e5 !important;
  background-color: rgb(249, 249, 249) !important;
  font-size: 11px;
  color: #666;
}
.zan-card {
  padding: 3px 3px !important;
}
.searchbar-result{
  margin-top: 0;
  font-size: 14px;
}
.searchbar-result:before{
  display: none;
}
.weui-cell{
    padding: 12px 15px 12px 35px;
}
.slide-image {
  width: 100%;
}
.product-image {
  width: 78px;
  height: 78px;
}
.line {
  width: 2px;
  height: 79px;
  margin-left: 2px;
  border-left: 1px rgb(229, 229, 229) dotted;
}
.content {
  margin-left: 4px;
}
.content .zan-card__detail-row{
  margin-bottom: 0px;
}
.coupon {
  margin-top: 10px;
}
.coupon-price {
  font-size: 20px
}
.coupon-price, .coupon-text, .coupon-info {
  text-align: center;
}
.coupon-info {
  color: red;
}
</style>
