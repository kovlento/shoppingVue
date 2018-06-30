<template>
  <div>
	<div class="search-bar">
		<van-row class="test-row">
		<van-col span="3">
			<img :src="locationIcon" width="50%" class="location-icon">
		</van-col>
		<van-col span="16">
			<input type="text" class="search-input" name="">
		</van-col>
		<van-col span="5">
			<van-button size="mini">查找</van-button>
		</van-col>
	</van-row>
	</div>
    <!--swipwer area-->
	<div class="swiper-area">
	    <van-swipe :autoplay="1000">
		  <van-swipe-item v-for="(image, index) in bannerPicArray" :key="index">
		    <img v-lazy="image.image" width="100%"/>
		  </van-swipe-item>
		</van-swipe>
	</div>
    <!--type-bar-->
	<div class="type-bar">
	    <div  v-for="(cate,index) in category" :key="index" >
            <img v-lazy="cate.image" width="90%" />
            <span>{{cate.mallCategoryName}}</span> 
    	</div>
	</div>
	<!--banner-->
	<div class="ad-banner">
		<img v-lazy="adBanner.PICTURE_ADDRESS" width="100%"/>
	</div>
	<!--Recommend goods area-->
	<div class="recommend-area">
		<div class="recommend-title">
			商品推荐
		</div>
		<div class="recommend-body">
            <swiper :options="swiperOption">
               <swiper-slide v-for="(item,index) in recommendGoods " :key="index" >
                   <div class="recommend-item">
                       <img :src="item.image" width="80%">
                       <div>{{item.goodsName}}</div>
                       <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
                   </div>
               </swiper-slide> 
            </swiper>
		</div>
	</div>
  <!--floor one area-->
  <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
  <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
  <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
  <!-- Hot area -->
  <div class="hot-area">
    <div class="hot-title">热卖商品</div>
    <div class="hot-goods">
       <!--这里需要一个list组件-->
       <van-list>
          <van-row gutter="20">
              <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                <goodsInfo :goodsImage="item.image" :goodsNames="item.name" 
                :goodsPrice="item.price">
                </goodsInfo>
              </van-col>
          </van-row>
        </van-list>
    </div>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {swiper , swiperSlide} from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponent'
import {toMoney} from '@/filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfoComponent'
import url from '@/serviceAPI.config.js'

export default {
  components:{swiper,swiperSlide,floorComponent,goodsInfo},
  data () {
    return {
    	swiperOption:{
            slidesPerView:3
        },
    	locationIcon:require('../../assets/images/location.png'),
    	bannerPicArray:[],
    	category:[],
    	adBanner:[],
    	recommendGoods:[],
      floor1:[],
      floor2:[],
      floor3:[],
      floorName:{},
      hotGoods:[] 
    }
  },
  filters:{
    moneyFilter(money){
        return toMoney(money)
    }  
  },
  created(){
  	axios({
  		url: url.getShoppingMallInfo,
      method: 'get',
  	})
  	.then(response=>{
  		console.log(response)
  		if(response.status==200){
  			this.category=response.data.data.category;
  			//先在created里获取数据，然后进行html骨架编写，最后进行CSS样式的调整
  			this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
  			//轮播图片
  			this.bannerPicArray = response.data.data.slides;
  			//推荐商品   
  			this.recommendGoods = response.data.data.recommend;
        //floor1
        this.floor1 = response.data.data.floor1;              //楼层1数据
        this.floor2 = response.data.data.floor2;              //楼层2数据
        this.floor3 = response.data.data.floor3;            //楼层3数据
        this.floorName = response.data.data.floorName;        //楼层名称
        this.hotGoods = response.data.data.hotGoods;
  		}
  	})
  	.catch(error=>{
      console.log(error)
  	})
  }
}
</script>
<style scoped>
	.search-bar {
		height: 2.2rem;
		background-color: #78A5F1;
		line-height: 2.2rem;
	}
	.search-input  {
		width: 100%;
		height: 1.3rem;
		border-top:0;
		border-left: 0;
		border-right: 0;
		border-bottom: 1px solid #fff !important;
		background-color:#78A5F1;
		color: #fff;
	}
	.location-icon {
		padding: 0.6rem 0 0 1.2rem; 
	}
	.swiper-area{
      	clear:both;
        max-height:9rem;
        overflow: hidden;
    }
    .type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
  }
   .recommend-area{
       background-color: #fff;
       margin-top: .3rem;
  }
  .recommend-title{
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#e5017d;
  }
    .recommend-body{
       border-bottom: 1px solid #eee;
   }
 
  .recommend-item{
      width:99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center;
  }
 .floor-anomaly{
      display: flex;
      flex-direction:row;
      background-color: #fff;
      border-bottom:1px solid #ddd;
  }
  .floor-anomaly div{
     width:10rem;
 
     box-sizing: border-box;
     -webkit-box-sizing: border-box;
  }
  .floor-one{
      border-right:1px solid #ddd;
 
  }
  .floor-two{
      border-bottom:1px solid #ddd;
  }
  .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
</style>