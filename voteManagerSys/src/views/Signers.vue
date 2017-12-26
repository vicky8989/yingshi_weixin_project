<template>
	<div>
	<div class="index_source">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报名管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-form :inline="true" class="demo-form-inline">
	  <el-form-item>
	    <el-input placeholder="搜索"></el-input>
	  </el-form-item>
	  <el-form-item>
	    <el-button @click="search">搜索</el-button>
	  </el-form-item>
	  <el-form-item>
	    <el-button @click="goBack">返回</el-button>
	  </el-form-item>
	</el-form>
  	<el-table :data="signerList" style="width: 1005px;">
		<el-table-column
	      fixed
	      prop="nickname"
	      label="报名者"
	      width="200">
	    </el-table-column>
	    <el-table-column
	      fixed
	      prop="headimgurl"
	      label="缩略图"
	      width="200">
	    </el-table-column>
	    <el-table-column
	      fixed
	      prop="phone"
	      label="手机号"
	      width="100">
	    </el-table-column>
	    <!-- <el-table-column
	      fixed
	      prop="uploadtime"
	      label="上传时间"
	      width="100">
	    </el-table-column> -->
	    <el-table-column
	      fixed
	      label="审核状态"
	      width="300">
	      <template scope="scope">
	      	<el-dropdown size="mini" split-button type="primary">
	      		审核状态
              <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item>审核通过</el-dropdown-item>
			    <el-dropdown-item>不通过</el-dropdown-item>
			  </el-dropdown-menu>
			  </el-dropdown>
           </template>
	    </el-table-column>
	</el-table>
</div>
</template>
<style type="text/css">
	.demo-form-inline {
		margin-top: 20px;
	}
</style>

<script>
import Vue from 'vue';
export default {
  name: 'signers',
  data () {
    return {
    	signerList:[]
    }
  },
  methods:{
  	search() {
  		console.log('search');
  	},
  	goBack() {
  		this.$router.push('/index');
  	},
  	getSignerList(){
  		let self = this;
        this.ApiSever.getSignerList().then(res => {
        	console.log(res);
        	if(res && res.data)
            	self.signerList = res.data;
        });
  	}
  },
  mounted() {
    this.getSignerList();
  }
}
</script>