<template>
	<div>
		<el-button type="primary" icon="el-icon-plus" @click="handleShow">添加图文投票</el-button>
    <el-table
    :data="activityList"
    border
    style="width: 1000px; margin-top: 20px;">
    <el-table-column
      fixed
      prop="name"
      label="活动标题"
      width="200">
    </el-table-column>    
    <el-table-column
      fixed
      prop="date"
      label="报名起止时间"
      width="125">
      <template scope="scope">
          <p>{{getTime(scope.row.start)}}</p>
          <p>{{getTime(scope.row.end)}}</p>
      </template>
    </el-table-column>
    <el-table-column
      fixed
      prop="date"
      label="投票起止时间"
      width="125">
    <template scope="scope">
          <p>{{getTime(scope.row.start)}}</p>
          <p>{{getTime(scope.row.end)}}</p>
      </template>
    </el-table-column>
    <el-table-column
      fixed
      prop="date"
      label="活动状态"
      width="150">
      <template scope="scope">
        <span :class="scope.row.status == 0? 'normal-class':'red-class'">报名期</span>/<span :class="scope.row.status == 1? 'normal-class':'red-class'">非投票期</span>
      </template>
    </el-table-column>
    <el-table-column
      fixed
      prop="date"
      label="操作"
      width="398">
      <template scope="scope">
        <el-button @click="editDetials(scope.row)">编辑</el-button>
        <el-button @click="handleShowActive(scope.row)">投票选项</el-button>
        <el-button @click="handleShowSigner(scope.row)">报名管理</el-button>
        <el-button @click="handleShowActive(scope.row)">投票记录</el-button>
        <el-button @click="handleDelActive(scope.row,scope.$index)">删除</el-button>
        <el-button>活动二维码</el-button>
      </template>
    </el-table-column>
  </el-table>

	</div>
</template>

<script>
import Vue from 'vue'


export default {
  name: 'index',
  data () {
    return {
      activityList:[]
    }
  },
  components: {
  },
  methods:{
    getTime(date) {
      let time = this.$moment(date).format("YYYY-MM-DD");
      return time;
    },
    handleShowSigner(row) {
      this.$router.push({
        path:'/signer/'+row._id,
        param:{
          id:row._id
        }
      });
    },
  	handleShow() {
      this.$router.push('/setting')
    },
    editDetials(row) {
      this.$router.push({
        path:'/setting/'+row._id,
        param:{
          id:row._id
        }
      })
    },

    //删除活动
    handleDelActive(row,index) {
      let self = this;
        this.ApiSever.delActivitieInfo(row._id).then(res => {
          if(res && res.data){
            self.activityList.splice(index,1);
            self.$message('删除活动成功！');
          }
        });
    },

    handleShowActive(row) {
      this.$router.push({
        path:'/votes/'+row._id,
        param:{
          id:row._id
        }
      });
    },

    getActivity(){
        let self = this;
        this.ApiSever.getActivities().then(res => {
            self.activityList = res.data;
        });
    }
  },
  mounted() {
    this.getActivity();
	}
}
</script>

<style lang="less">
.el-button {
  margin-top:5px;
}
.normal-class{
  color:black;
}
.red-class {
  color:red;
}
</style>