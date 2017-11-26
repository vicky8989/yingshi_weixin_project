<template>
    <div>
      <conutDown :time="endTime"/>
      <div class="aui-margin-t-15 aui-margin-r-10 aui-margin-l-10 aui-content">
        <div class="aui-bar aui-bar-btn aui-bar-btn-sm">
            <div class="aui-bar-btn-item aui-active">票数榜</div>
            <div class="aui-bar-btn-item " >礼物榜</div>
        </div>
        <div class="aui-content content-card-list">
          <ul class="aui-list aui-media-list aui-font-size-12" v-for="(item,index) in rankList">
            <router-link :to="{path:'vote',query:{id:item.id}}" :key="item.id">
            <li class="aui-list-item aui-list-item-middle">
                <div class="aui-media-list-item-inner">
                    <div class="aui-list-item-media" style="width: 3rem;">
                        <img :src="item.pic" class="aui-img-round aui-list-img-sm">
                    </div>
                    <div class="aui-list-item-inner" style="width:11.27rem">
                        <div class="aui-list-item-text aui-font-size-12">
                            <div class="aui-list-item-title aui-font-size-12">{{item.name}}  {{item.number}}</div>
                            <div class="aui-list-item-right">{{index+1}}</div>
                        </div>
                        <div class="aui-list-item-text aui-font-size-12">
                            <span>票数 {{item.voteNum}}  礼物 {{item.present}}点</span>
                        </div>
                        <div class="aui-list-item-text aui-ellipsis-1 aui-font-size-12" style="max-width:11rem">
                          {{item.title}}
                        </div>
                    </div>
                </div>
            </li>
            </router-link>
        </ul>
        </div>
      </div>
      <BottomNav/>
    </div>
</template>
<style scoped>

</style>
<script>
import conutDown from './common/conutDown.vue';
import BottomNav from './common/BottomNav.vue';
import Mock from 'mockjs';
let maxPageNum = 5;
// 生成商品列数据
Mock.mock('userList.json', {
        code: 1,
        msg: '查询成功',
        data: {
            'total': 20,
            'records': 10,
            'page': 1,
            'rows|10': [{
                'id|+1': 1,
                'voteNum': '@natural(10, 100)',
                'number': '@natural(1, 100)',
                'name':'@cword(2, 5)',
                'present':'@natural(1, 100)',
                'title': '@ctitle(6,20)',
                'pic': '@image(200x200,#50B347,#fff, nice)'
            }]
        }
});

 export default {
  name: 'Pink',
  data () {
    return {
      endTime:'2017/12/2 20:10:10',
      rankList:[]
    }
  },
  components:{
     BottomNav,
     conutDown
  },
  methods:{
    bindButtonBarEvents() {
      var self_=this;
      
    },
    ajaxRankList(){
         var self=this;
         self.$http.get('userList.json',{page:self.page}).then(function (response) {
                self.scroll = true;
                let data = response.body.data;
                // alert("ass");
                if (response.body.code == 1) {
                   self.loading=false;
                    if(self.page==1){
                      self.rankList=data.rows;
                    }else{
                      self.rankList=self.rankList.concat(data.rows)
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
       self.ajaxRankList();
       $('.aui-bar-btn .aui-bar-btn-item').click(function(dom){
          $(this).addClass('aui-active').siblings().removeClass('aui-active');
          let index =$('.aui-bar-btn .aui-bar-btn-item').index($(this));
          if(index == 0) {
            self.rankList.sort((a,b)=>{
              return a.voteNum < b.voteNum;
            })
          } else {
            self.rankList.sort((a,b)=>{
              return a.present < b.present;
            })
          }
      });
     });
  }
}
</script>
