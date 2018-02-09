<template>
	<div>
		<div class="top">
			<el-button type="primary" icon="el-icon-plus" @click="handleShow">添加图文投票</el-button>
		</div>
		<el-table :data="activityList" border style="100%">
			<el-table-column prop="name" label="活动标题">
			</el-table-column>
			<el-table-column prop="date" label="报名起止时间">
				<template scope="scope">
					<p>{{getTime(scope.row.enrolstart)}}</p>
					<p>{{getTime(scope.row.enrolend)}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="date" label="投票起止时间">
				<template scope="scope">
					<p>{{getTime(scope.row.votestart)}}</p>
					<p>{{getTime(scope.row.voteend)}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="date" label="活动状态">
				<template scope="scope">
					<span :class="!scope.row.status||parseInt(scope.row.status) == 0? 'normal-class':'red-class'">报名期</span>/<span :class="parseInt(scope.row.status) == 1? 'normal-class':'red-class'">投票期</span>
				</template>
			</el-table-column>
			<el-table-column prop="date" label="操作" width="660px">
				<template scope="scope">
					<el-button size="small" type="primary" icon="el-icon-edit-outline" @click="editDetials(scope.row)">编辑</el-button>
					<el-button size="small" type="success" icon="el-icon-goods" @click="handleShowActive(scope.row)">投票选项</el-button>
					<el-button size="small" type="primary" icon="el-icon-menu" @click="handleShowSigner(scope.row)">报名管理</el-button>
					<el-button size="small" type="success" icon="el-icon-document" @click="handleShowActive(scope.row)">投票记录</el-button>
					<el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelActive(scope.row,scope.$index)">删除</el-button>
					<el-button size="small" type="primary" icon="el-icon-view">活动二维码</el-button>
				</template>
			</el-table-column>
		</el-table>

	</div>
</template>

<script>
	import Vue from 'vue'

	export default {
		name: 'index',
		data() {
			return {
				activityList: []
			}
		},
		components: {},
		methods: {
			getTime(date) {
				let time = this.$moment(date).format("YYYY-MM-DD");
				return time;
			},
			handleShowSigner(row) {
				this.$router.push({
					path: '/signer/' + row._id,
					param: {
						id: row._id
					}
				});
			},
			handleShow() {
				this.$router.push('/setting')
			},
			editDetials(row) {
				this.$router.push({
					path: '/setting/' + row._id,
					param: {
						id: row._id
					}
				})
			},

			//删除活动
			handleDelActive(row, index) {
				let self = this;
				this.$confirm('删除此信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.ApiSever.delActivitieInfo(row._id).then(res => {
						if(res && res.data) {
							self.activityList.splice(index, 1);
							self.$message({
								message: '删除活动成功！',
								type: 'success'
							});
						}
					});
				}).catch(() => {
					self.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},

			handleShowActive(row) {
				this.$router.push({
					path: '/votes/' + row._id,
					param: {
						id: row._id
					}
				});
			},

			getActivity() {
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

<style lang="less" scoped>
	.el-button {
		margin-top: 5px;
	}
	
	.normal-class {
		color: black;
	}
	
	.red-class {
		color: red;
	}
	
	.top {
		width: 100%;
		height: auto;
		display: block;
		overflow: hidden;
		margin-bottom: 20px;
	}
</style>