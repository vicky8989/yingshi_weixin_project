<template>
	<div>
	  <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
      <el-label>1元钱对应点数：</el-label>
    </el-form-item>
	  <el-form-item>
	    <el-input placeholder="点数" v-model="money"></el-input>
	  </el-form-item>
    <el-form-item>
      <el-button @click="goBack">修改</el-button>
    </el-form-item>
	</el-form>
  	<el-table :data="giftList" style="width: 100%">
		<el-table-column
	      fixed
	      prop="name"
	      label="礼物名称"
	      width="200">
	    </el-table-column>
	    <el-table-column
	      fixed
	      prop="num"
	      label="点数（点）"
	      width="200">
	    </el-table-column>
	    <el-table-column
	      fixed	      
	      label="缩略图"
	      width="200" height="80">
	       <template slot-scope="scope">
	      		<img src="imgURL+scope.row.giftimg" />
	  		</template>
	    </el-table-column>
      <el-table-column
        fixed       
        label="操作">
         <template slot-scope="scope">
           <el-button @click="delPresent(scope.row)">删除</el-button>
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
  name: 'present',
  data () {
    return {
    	giftList:[],
    	imgURL: this.ApiSever.imgUrl,
      money:1
    }
  },
  methods:{  	
  	goBack() {
  		this.$router.push('/index');
  	},  	
  	getPresentList(aid){
  		let self = this;
        this.ApiSever.getPresentList().then(res => {
        	if(res && res.data && res.data.length >0){
        		self.giftList = res.data;
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
    this.getPresentList();
  }
}
</script>