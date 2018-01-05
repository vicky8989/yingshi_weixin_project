<template>
	<div>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
		    <el-button v-on:click="votesStatic">投票者统计信息</el-button>
		  </el-form-item>
		  <el-form-item>
		    <el-button v-on:click="votesInfoList">投票选项投票信息</el-button>
		  </el-form-item>
		  <el-form-item>
		    <el-input placeholder="搜索"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button  v-on:click="search">搜索</el-button>
		  </el-form-item>
		  <el-form-item>
		    <el-button  v-on:click="goBack">返回</el-button>
		  </el-form-item>
		</el-form>
		<el-table :data="voteList" v-if="this.isVote == true" style="width: 1005px;">
			<!-- <el-table-column
					      fixed
					      prop="name"
					      label="活动名称"
					      width="200">
					    </el-table-column> -->
		    <el-table-column
		      fixed
		      prop="votename"
		      label="投票者名称"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop=""
		      label="地区"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop="tel"
		      label="电话"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop="num"
		      label="已投票数"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop="curnum"
		      label="今日投票数"
		      width="100">
		    </el-table-column>		    
		    <el-table-column
		      fixed
		      prop="lasttime"
		      label="最后投票时间"
		      width="300">
		    </el-table-column>
		</el-table>
		<el-table :data="paticitesList" v-else style="width: 1005px;">
			<!-- <el-table-column
					      fixed
					      prop="name"
					      label="活动名称"
					      width="200">
					    </el-table-column> -->
		    <el-table-column
		      fixed
		      prop="name"
		      label="参与者昵称"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop="code"
		      label="编号"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop="phone"
		      label="手机号"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop="votenum"
		      label="已投票数"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop="giftnum"
		      label="礼物数"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop="money"
		      label="礼物总额"
		      width="300">
		    </el-table-column>
		</el-table>
	</div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'votes',
  data () {
    return {
    	activeId:this.$route.params.id,
    	voteList:[],
    	paticitesList:[],
    	isVote:true
    }
  },
  methods:{
  	votesStatic(){
  		this.isVote = true;
  	},
  	votesInfoList() {
		this.isVote = false;
  	},
  	search() {
  		console.log('search');
  	},
  	goBack() {
  		this.$router.push('/index');
  	},
  	getVoterList(){
  		let self = this;
        this.ApiSever.getVoterList().then(res => {
            self.voteList = res.data.data.value;
        });
  	},
  	getPaticiesList(aid){
  		let self = this;
        this.ApiSever.getPaticitesList(aid).then(res => {
        	if(res && res.data && res.data.length >0)
        		self.paticitesList = res.data;
        	let presentIndex = 0;
        	for(var i=0,ilen = res.data.length; i <ilen; i++){
	        	//请求礼物信息
				self.ApiSever.getPresentsDetail(res.data[i]._id).then(gifts => {
					let giftsInfo = gifts.data;
					console.log('giftNum i',giftsInfo,presentIndex);
					self.paticitesList[presentIndex].giftnum = 0;
					giftsInfo.map((item)=>{
						self.paticitesList[presentIndex].giftnum+=item.num;
					})

					self.paticitesList[presentIndex].money = self.paticitesList[presentIndex].giftnum;
					presentIndex++;
					if(presentIndex == i) self.$forceUpdate();
				});
			}
        });
  	}
  },
  mounted() {
  	// if(this.activeId) {
  	// 	this.$router.push('/index');
  	// }
    this.getVoterList();
    this.getPaticiesList(this.activeId);
 }
}
</script>