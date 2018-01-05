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
	    <el-input placeholder="搜索" v-model="searchTxt"></el-input>
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
	      prop="name"
	      label="报名者"
	      width="200">
	    </el-table-column>
	    <el-table-column
	      fixed
	      prop="phone"
	      label="手机号"
	      width="200">
	    </el-table-column>
	    <el-table-column
	      fixed
	      prop="headimgurl"
	      label="缩略图"
	      width="200">
	       <template slot-scope="scope">
	      		<el-button type="text" @click="previewImg(scope.row.pics)">预览</el-button>
	  		</template>
	    </el-table-column>
	    <el-table-column
	      fixed
	      label="审核状态"
	      width="300">
	      <template slot-scope="scope">
	      	<el-select v-model="scope.row.status" @change="updateSingerStatus(scope.row)" placeholder="请选择">
		    <el-option
		      label="审核通过"
		      value="1">
		    </el-option>
		    <el-option
		      label="审核不通过"
		      value="0">
		    </el-option>
		  </el-select>
           </template>
	    </el-table-column>
	</el-table>

	<el-dialog
        title="预览"
        :visible.sync="dialogVisible"
        :before-close="handleClose">
        <template>
		  <el-carousel :interval="4000" type="card" height="200px">
		    <el-carousel-item v-for="item in pics" :key="item">
		      <img :src="imgURL+item" style="max-width:600px;" />
		    </el-carousel-item>
		  </el-carousel>
		</template>
      </el-dialog>
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
    	activeId:this.$route.params.id,
    	imgURL: this.ApiSever.imgUrl,
    	pics:[],
    	dialogVisible: false,
    	signerList:[],
    	originData:[],
    	searchTxt:''
    }
  },
  methods:{
  	search() {
  		let self = this,txt = this.searchTxt.trim();
  		if(txt!='') {
  			this.signerList =[];
  			this.originData.forEach((item)=>{
  				if(item.name.indexOf(txt)>=0 || item.phone.indexOf(txt) >=0) {
  					this.signerList.push(item);
  				}
  			})
  		} else {
  			this.signerList = this.originData;
  		}
  	},
  	goBack() {
  		this.$router.push('/index');
  	},
  	handleClose() {
      this.dialogVisible = false;
    },
  	previewImg(pics) {
  		this.pics = pics;
  		this.dialogVisible = true;
  	},
  	getSignerList(aid){
  		let self = this;
        this.ApiSever.getPaticitesList(aid).then(res => {
        	if(res && res.data && res.data.length >0){
        		self.signerList = res.data.map((item)=>{item.status=item.status.toString();
        			self.originData.push(item);
        			return item;});

        	}
        });
  	},
  	updateSingerStatus(row) {
  		let self = this;  		
  		let newRow = Object.assign({},row,{
  			status:parseInt(row.status)
  		});
  		this.ApiSever.updateSinger(row._id,newRow).then(res=>{
  			console.log('update singer success',res);
  		})
  	}
  },
  mounted() {
    this.getSignerList(this.activeId);
  }
}
</script>