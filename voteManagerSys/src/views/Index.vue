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
          <p>{{scope.row.starttime}}</p>
          <p>{{scope.row.endtime}}</p>
      </template>
    </el-table-column>
    <el-table-column
      fixed
      prop="date"
      label="投票起止时间"
      width="125">
    <template scope="scope">
          <p>{{scope.row.votestarttime}}</p>
          <p>{{scope.row.voteendtime}}</p>
      </template>
    </el-table-column>
    <el-table-column
      fixed
      prop="date"
      label="活动状态"
      width="150">
      <template scope="scope">
        <span>报名期</span>/<span>非投票期</span>
      </template>
    </el-table-column>
    <el-table-column
      fixed
      prop="date"
      label="操作"
      width="398">
      <template scope="scope">
        <el-button>编辑</el-button>
        <el-button>投票选项</el-button>
        <el-button>报名管理</el-button>
        <el-button>投票记录</el-button>
        <el-button>删除</el-button>
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
  	handleShow() {
      this.$router.push('/setting');
    },

    getActivity(){
        let self = this;
        this.ApiSever.getActivities().then(res => {
            self.activityList = res.data.data.value;
        });
    }
  },
  mounted() {
    this.getActivity();
	}
}
</script>

<style lang="less">
</style>