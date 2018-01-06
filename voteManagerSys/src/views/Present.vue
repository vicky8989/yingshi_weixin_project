<template>
	<div>
	  <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
      <label>1元钱对应点数：</label>
    </el-form-item>
	  <el-form-item>
	    <el-input placeholder="点数" v-model="money" @change="changeMoney()"></el-input>
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
        <template scope="scope">
            <el-input size="small" v-model="scope.row.name" placeholder="请输入礼物名称" @change="handleEdit(scope.$index, scope.row)"></el-input>
        </template>
	    </el-table-column>
	    <el-table-column
	      fixed
	      prop="num"
	      label="点数（点）"
	      width="200">
        <template scope="scope">
            <el-input size="small" v-model="scope.row.num" placeholder="请输入礼物名称" @change="handleEdit(scope.$index, scope.row)"></el-input>
        </template>
	    </el-table-column>
	    <el-table-column
	      fixed
	      label="缩略图"
        prop="giftimg"
	      width="200" height="80">
	       <template slot-scope="scope">
	      		<img :src="imgURL+scope.row.giftimg" />
            <input type="file" placeholder="请选择" name="giftPic" ref="giftPic" class="giftPic" @change="updateGiftPic(scope.$index,scope.row)" />
	  		</template>
	    </el-table-column>
      <el-table-column
        fixed
        label="操作">
         <template slot-scope="scope">
           <el-button @click="delPresent(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
	</el-table>
  <el-button @click="addPresent()" style="margin-top:20px;">新增礼物</el-button>
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
    //获得礼物列表
  	getPresentList(){
  		let self = this;
        this.ApiSever.getPresentList().then(res => {
        	if(res && res.data && res.data.length >0){
        		self.giftList = res.data;
        	}
        });
  	},
    //1块钱对应多少点数
    getMoney() {
      let self = this;
      this.ApiSever.getMoney().then(res => {
          if(res && res.data)
            self.money = res.data.prize;
      });
    },

    //改变礼物点数和人民币的对应关系
    changeMoney() {
      let self = this;
      let data = {
        "prize":self.money
      };
      this.ApiSever.updateMoney(data).then(res => {
          console.log('update money',data);
          this.$message('更新价格成功！');
      });
    },

    //删除某个礼物图片
    deletePhoto(filename) {
      let self = this;
      this.ApiSever.delActivityImg(filename).then(res => {
          console.log('del gift img',filename);
      });
    },
    //更新礼物图片
    updateGiftPic(rowindex,row) {
      var vm = this;
      if($('.giftPic').get(rowindex).files.length>0 && $('.giftPic').get(rowindex).files[0].type.indexOf("image") != -1) {
        vm.deletePhoto(row.giftimg);
        var fd = new FileReader();
        fd.readAsDataURL($('.giftPic').get(rowindex).files[0]);
        fd.onload = function() {
          if(fd.result) {
            var formData = new FormData();
            formData.append("image", $('.giftPic').get(rowindex).files[0]);
            $.ajax({
              url: vm.uploadURL,
              type: 'POST',
              data: formData,
              cache : false,
              xhrFields:{'Access-Control-Allow-Origin': '*' },
              processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
              contentType : false, // 不设置Content-type请求头
              success: function(responseStr) {
                var result = responseStr;
                row.giftimg = result.filename;
                vm.updateGift(row);
              },
              error: function(responseStr) {
                alert('上传失败')
              }
            });
          }
        }
      } else {
        alert('上传图片不符合规则，请重新上传');
      }
    },
    //修改奖品信息
    updateGift(row) {
      row.num = !row.num?0:parseInt(row.num);
      row.giftimg = !row.giftimg?'':row.giftimg;
      this.ApiSever.updatePresent(row).then(res => {
          console.log('update prize',res);
      });
    },
    handleEdit(index, row) {
        this.updateGift(row);
    },
  	updateSingerStatus(row) {
  		let self = this;
  		let newRow = Object.assign({},row,{
  			status:parseInt(row.status)
  		});
  		this.ApiSever.updateSinger(row._id,newRow).then(res=>{
  			console.log('update singer success',res);
  		})
  	},
    delPresent(row,index) {
        let self = this;
        this.ApiSever.delPresent(row._id).then(res => {
             if(res.data) {
                self.giftList.splice(index,1);
             }
        });
    },
    addPresent() {
      let newGift = {
        "name":"礼物1",
        "giftimg":"礼物的图片",
        "num":100
      };
      let self = this;
      this.ApiSever.addPresent(newGift).then(res => {
           if(res.data) {
              newGift._id = res.data;
              self.giftList.push(newGift);
           }
      });
    }
  },
  mounted() {
    this.getPresentList();
    this.getMoney();
  }
}
</script>