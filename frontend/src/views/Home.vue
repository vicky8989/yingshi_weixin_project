<template>
        <div>
         <!-- <div v-if="Math.random() > 0.5">
            Now you see me
          </div>
          <div v-else>
            Now you don't
          </div>-->
          <Slider :list="pics"/>
          <section class="pd-10 bg-1 aui-text-center aui-font-size-12 lh-18 bg-white">
            <div class="aui-row">
              <div class="aui-col-xs-4 bd-r-1">
                <div class="text-white"><i class="iconfont icon-baoming1"></i> 已报名</div>
                <div class="aui-font-size-14 cl-1"><strong>43</strong></div>
              </div>
              <div class="aui-col-xs-4 bd-r-1">
                <div class="text-white"><i class="iconfont icon-toupiao"></i> 累计投票</div>
                <div class="aui-font-size-14 cl-1"><strong>43</strong></div>
              </div>
              <div class="aui-col-xs-4">
                <div class="text-white"><i class="iconfont icon-fangwenliuliang"></i> 访问量</div>
                <div class="aui-font-size-14 cl-1"><strong>43</strong></div>
              </div>
            </div>
          </section>
          <conutDown time="2017/12/2 20:10:10"/>
          <div class="aui-margin-t-10 pos-r ">
            <!--改成搜索-->
            <div class="index-select-box" id="index-sel">
              <div class="index-select-item active">默认排序</div>
              <div class="index-select-item">最美丽</div>
              <div class="index-select-item">最干净</div>
              <div class="index-select-item">最古老</div>
              <div class="index-select-item">最神秘</div>
            </div>
            <div class="pos-a more-sel hide" id="more-sel"></div>
          </div>
          <div class="aui-padded-l-10  bg-white">

              <div class="aui-row aui-font-size-12 aui-padded-t-15" id="picsBox">
                <div class="aui-col-xs-6  aui-text-left aui-padded-r-10" v-for="(item,index) in userList"  >
                   <router-link :to="{path:'vote',query:{id:item.id}}" :key="item.id" class="display-b bd-b aui-padded-b-10 aui-margin-b-10 pos-r" >
                    <img :src="item.pic" alt="">
                    <div class="cl-666 aui-margin-t-5 text-hide-2">{{item.title}}</div>
                    <div class="pos-r aui-padded-t-5 aui-margin-t-5">
                     <!--  <span class="cl-2 aui-padded-t-5">{{item.voteNum}}票</span> -->
                      <div class="index-vote bg-1">投票</div>
                    </div>
                    <div class="index-voteNum">{{item.number}}号，{{item.voteNum}}票</div>
                  </router-link>
                </div>
              </div>
              <loading tips="加载中" :show="loading"  />
          </div>
          <BottomNav/>
        </div>
</template>
<script>
  import Slider from './common/Slider.vue';
  import conutDown from './common/conutDown.vue';
  import BottomNav from './common/BottomNav.vue'
  import loading from './common/loading.vue'
  import Mock from 'mockjs';
  let maxPageNum = 5;
  // 生成轮播数据
    const imgdata = Mock.mock({
        'list|3': [{
            'id|+1': 1,
            'src': '@image(750x400, #ffcc33, #333,Banner)',
        }]
    })
    // 生成商品列数据
    Mock.mock('userList.json', {
        code: 1,
        msg: '查询成功',
        data: {
            'total': 40,
            'records': 10,
            'page': 1,
            'rows|10': [{
                'id|+1': 1,
                'voteNum': '@natural(10, 100)',
                'number': '@natural(1, 100)',
                'title': '@title(6, 20)',
                'pic': '@image(200x200,#50B347,#fff, nice)'
            }]
        }
    })
     var requestAnimationFrame =
        window.requestAnimationFrame || //Chromium
        window.webkitRequestAnimationFrame || //Webkit
        window.mozRequestAnimationFrame || //Mozilla Geko
        window.oRequestAnimationFrame || //Opera Presto
        window.msRequestAnimationFrame || //IE Trident?
        function(callback) { //Fallback function
           window.setTimeout(callback, 1000/60);
        };

      var  distance=10;
  export default {
  name: 'Home',
  data () {
    return {
      pics:[],
      userList:[ ],
      odd:[],
      even:[],
      page: 1, //当前页数
      loading:true,
       scroll:true
    }
  },
  components:{
          Slider,
          conutDown,
          BottomNav,
          loading
   },
   methods:{
      ajaxList(){
         var self=this;
         self.$http.get('userList.json',{page:self.page}).then(function (response) {
                      self.scroll = true;
                      let data = response.body.data;
                      // alert("ass");
                      if (response.body.code == 1) {
                         self.loading=false;
                          if(self.page==1){
                            self.userList=data.rows;
                          }else{
                            self.userList=self.userList.concat(data.rows)
                          }

                      }
         }, function (response) {
                      // error callback
           })
      }


   },
  mounted: function () {
    this.$nextTick(function () {
       var self=this;
       self.pics=imgdata.list;
       self.ajaxList();
       //加载更多
       window.addEventListener("scroll", function(event) {
            requestAnimationFrame(function(){
              var clientHeight = document.documentElement.scrollTop === 0 ? document.body.clientHeight : document.documentElement.clientHeight;
		        	var scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
		        	var scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
              if (scrollHeight-scrollTop-distance <= window.innerHeight) {
                    self.scroll = false;
                    self.page+=1;
                    self.loading=true;
                    if(self.page <= maxPageNum)self.ajaxList();

             }

            })
         });
    })
  }
}
</script>
