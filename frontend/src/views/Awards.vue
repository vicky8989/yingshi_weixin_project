<template>
	<div>
		<div class="aui-content aui-margin-b-15">
			<ul class="aui-list aui-list-in" v-for="(item,index) in awardsList">
		        <li class="aui-list-header aui-padded-l-15" style="text-align:left;">		        	
		            {{item.name}} {{item.number}}名
		        </li>
		        <template v-for="(detail,i) in item.details">
			        <li class="aui-list-item ">
			            <div class="aui-list-item-inner">
			                <div class="aui-list-item-title aui-text-danger aui-font-size-12">{{detail.name}}:{{detail.subname}}</div>
			            </div>
			        </li>
		    	</template>
	    	</ul>
    	</div>
		<BottomNav/>
	</div>
</template>
<style scoped>

</style>

<script>
import BottomNav from './common/BottomNav.vue';
import Mock from 'mockjs';


// 生成商品列数据
Mock.mock('awards.json', {
        code: 1,
        msg: '查询成功',
        data: {
            'total': 20,
            'records': 10,
            'page': 1,
            'rows|3': [{
                'id|+1': 1,
                'name':'@cword(3, 20)',
                "number": '@natural(1, 100)',
                'details|1-10':[
                	{
                		"name":"@cword(3, 4)",
                		"subname":"@cword(6, 10)"
                	}
                ]
            }]
        }
});

export default {
  data () {
    return {
      awardsList:[]
    }
  },
  components:{
	BottomNav
  },
  methods:{
  	ajaxAwardsList(){
         var self=this;
         self.$http.get('awards.json',{page:self.page}).then(function (response) {
                self.scroll = true;
                let data = response.body.data;
                // alert("ass");
                if (response.body.code == 1) {
                   self.loading=false;
                    if(self.page==1){
                      self.awardsList=data.rows;
                      console.log('data',self.awardsList);
                    }else{
                      self.awardsList=self.awardsList.concat(data.rows)
                    }

                }
         }, function (response) {
                // error callback
           })
      //}
  	}
  },
  mounted: function () {
  	this.$nextTick(function () {
  		var self=this;
        self.ajaxAwardsList();
  	});
  }
}

</script>