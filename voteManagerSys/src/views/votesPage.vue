<template>
	<div>
		<div class="index_source">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>投票统计</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
		    <el-button v-on:click="votesStatic">投票者统计信息</el-button>
		  </el-form-item>
		  <el-form-item>
		    <el-button v-on:click="votesInfoList">投票选项投票信息</el-button>
		  </el-form-item>
		  <el-form-item>
		    <el-input placeholder="搜索" style="margin-top: 5px;"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button  v-on:click="search">搜索</el-button>
		  </el-form-item>
		  <el-form-item>
		    <el-button  v-on:click="goBack">返回</el-button>
		  </el-form-item>
		</el-form>
		<el-table :data="voteList" v-if="this.isVote == true" style="width: 1005px;">
			<el-table-column
		      fixed
		      prop="name"
		      label="活动名称"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop="votename"
		      label="投票者"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop="tel"
		      label="投票者"
		      width="100">
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
			<el-table-column
		      fixed
		      prop="name"
		      label="活动名称"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop="parName"
		      label="参与者"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      fixed
		      prop="voteno"
		      label="编号"
		      width="100">
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
  	getPaticiesList(){
  		let self = this;
        this.ApiSever.getPaticitesList().then(res => {
            self.paticitesList = res.data.data.value;
        });
  	}
  },
  mounted() {
    this.getVoterList();
    this.getPaticiesList();
 }
}
</script>