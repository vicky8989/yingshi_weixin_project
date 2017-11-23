<template>
    <div>
      <Slider :list="pics"/>
      <div class="bg-1 cl-white aui-text-center pd-5 aui-font-size-14">福建培田古村</div>
      <section class="pd-10 bg-2 aui-text-center aui-font-size-12 lh-18">
        <div class="aui-row">
          <div class="aui-col-xs-3 bd-r-1">
            <div class="text-white"><i class="iconfont icon-ren"></i> 编号</div>
            <div class="aui-font-size-14 cl-1"><strong>{{userData.id}}</strong></div>
          </div>
          <div class="aui-col-xs-3 bd-r-1">
            <div class="text-white"><i class="iconfont icon-piao"></i> 票数</div>
            <div class="aui-font-size-14 cl-1"><strong>{{userData.voteNum}}</strong></div>
          </div>
          <div class="aui-col-xs-3 bd-r-1">
            <div class="text-white"><i class="iconfont icon-redu"></i> 热度</div>
            <div class="aui-font-size-14 cl-1"><strong>{{userData.hot}}</strong></div>
          </div>
          <div class="aui-col-xs-3">
            <div class="text-white"><i class="iconfont icon-liwu"></i> 礼物</div>
            <div class="aui-font-size-14 cl-1"><strong>{{userData.gift}}</strong></div>
          </div>
        </div>
      </section>
      <div class="pd-10  bg-white aui-margin-t-10">
        <h3 class="aui-text-center bd-b aui-padded-b-10 cl-2"><strong>最美介绍</strong></h3>
        <div class="aui-margin-t-10"  v-html="content"></div>
      </div>
      <div class="vote-bar bd-t aui-padded-t-5 aui-padded-b-5 aui-padded-r-10 aui-padded-l-10">
        <div class="aui-row ">
          <router-link :to="{path:'home'}"  href="index.html" class="aui-col-xs-4 cl-999"><i class="iconfont icon-shouye"></i> 首页</router-link>
          <div class="aui-col-xs-4 aui-text-center"><div class="vote-btn bg-3"><i class="iconfont icon-toupiao"></i> 投他一票</div></div>
          <div @click.prevent="showGift()" href="#" class="aui-col-xs-4 aui-text-right cl-999">礼物 <i class="iconfont icon-liwu"></i></div>
        </div>
      </div>
      <!--礼物列表-->
      <div class="gift-model " :class="{ in:giftActive }">
        <div class="cl-666 aui-font-size-14 pd-10 lh-14">请选择礼物：</div>
        <div class="aui-row aui-text-center aui-font-size-12 bd-b">
          <div class="aui-col-xs-4 pd-10 item " @click.prevent="tabActive=index" :class="[{on:index === tabActive}]" v-for="(item,index) in tabList" :key="item.id">
            <img :src="item.pic" width="60%" alt="">
            <div class="cl-999">{{item.text}}</div>
            <div class="cl-2">{{item.money}}点</div>
          </div>
        </div>
        <div class="aui-text-center pd-10">
          <div class="bg-1 cl-white" style="margin: 0 auto;border-radius:1rem;width: 9rem ; height: 2rem; line-height: 2rem;">确定</div>
        </div>
      </div>
      <div class="aui-mask " @click="giftHide()" :class="[maskShow ? 'aui-mask-in' : 'aui-mask-out']"></div>

    </div>
</template>
<script>
    import Slider from './common/Slider.vue';
 //   import OtherComponent from './components/other.vue'
    export default{
        data(){
            return{
             pics:[
              {src:"http://img.mianshui365.com/upload/65/fc/27/65fc278c29a325278946ad72afc2cad8.jpg@90q"},
              {src:"http://img.mianshui365.com/upload/6a/08/91/6a089192fce8fda3a862de22fb59c10d.jpg@90q"},
              {src:"http://img.mianshui365.com/upload/81/a4/bd/81a4bd3fb36c585124fe430b1c4743c3.jpg@90q"},
             ],
             userData:{
                voteNum:12,
                hot:12,
                gift:12,
                id:12
              },
              giftActive:false,
              maskShow:false,
              tabActive:0,
              tabList:[
                {pic:"image/youting.png",text:"游艇",money:"10"},
                {pic:"image/youting.png",text:"游艇",money:"10"},
                {pic:"image/youting.png",text:"游艇",money:"10"},
                {pic:"image/youting.png",text:"游艇",money:"10"},
                {pic:"image/youting.png",text:"游艇",money:"10"},
                {pic:"image/youting.png",text:"游艇",money:"10"}
                ],
             content:'<img class="aui-margin-b-10" src="http://p1.meituan.net/poi/e43f3804b92df25a8e763e8ccc285f7551200.jpg">\
          <img class="aui-margin-b-10" src="http://p0.meituan.net/poi/08ed9480f134366024a67eed8d997081475136.png">\
          <img class="aui-margin-b-10" src="http://p0.meituan.net/poi/29d573594628b892c497913d96db434338912.jpg">\
          <p>培田古民居是迄今南方地区保存最完整的古代居民群落之一。位于福建省连城县西部，距县城40公里，面积13.412平方公里。这个客家小山村拥有30余幢高堂华屋、21座古祠、6个书院、二道跨街碑坊和一条千米古街，因其保存完好的明清古建筑群而闻名。培田的建筑风格迥异于永定土楼，相较于永定土楼的封闭和坚固，培田民居则显得开放和优雅。其精致的建筑，精湛的工艺，浓郁的客家人文气息，是中国客家建筑文化的经典之作，人称“福建民居第一村”、“中国南方庄园”，有“民间故宫”之美誉。</p>\
             '

            }
        },
        components:{
            Slider,
        },
        methods:{
          showGift:function(){
           this.giftActive=true;
           this.maskShow=true;
          },
          giftHide:function(){
            this.giftActive=false;
            this.maskShow=false;
          }

        }
    }
</script>
