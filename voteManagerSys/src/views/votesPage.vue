<template>
	<div>
		<div class="index_source">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>投票管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
				<el-input placeholder="搜索" v-model="searchTxt"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" v-on:click="search">搜索</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-tickets" v-on:click="votesStatic">投票者统计信息</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-tickets" v-on:click="votesInfoList">投票选项投票信息</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-back" v-on:click="goBack">返回</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="voteList" v-if="this.isVote == true" style="width: 100%" border>
			<el-table-column prop="votename" label="投票者名称">
			</el-table-column>
			<el-table-column prop="" label="地区">
			</el-table-column>
			<el-table-column prop="tel" label="电话">
			</el-table-column>
			<el-table-column prop="num" label="已投票数">
			</el-table-column>
			<el-table-column prop="curnum" label="今日投票数">
			</el-table-column>
			<el-table-column prop="lasttime" label="最后投票时间">
			</el-table-column>
		</el-table>
		<el-table :data="paticitesList" v-else style="width: 100%;" border @cell-dblclick="editororderData">
			<el-table-column prop="name" label="参与者昵称">
			</el-table-column>
			<el-table-column prop="code" label="编号">
			</el-table-column>
			<el-table-column prop="phone" label="手机号">
			</el-table-column>
			<el-table-column prop="votenum" label="已投票数">
				<template scope="scope">
					<div class="productTr">
						<span :ref="'span_'+scope.row._id">{{scope.row.votenum}}</span>
						<div class="hide" :ref="'input_'+scope.row._id">
							<el-input size="small" v-model="scope.row.votenum" placeholder="已投票数" @blur="handleEdit(scope.$index, scope.row)"></el-input>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="giftnum" label="礼物数">
			</el-table-column>
			<el-table-column prop="money" label="礼物总额">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		name: 'votes',
		data() {
			return {
				activeId: this.$route.params.id,
				voteList: [],
				paticitesList: [],
				originSigners: [],
				isVote: true,
				money: 1,
				searchTxt: ''
			}
		},
		methods: {
			votesStatic() {
				this.isVote = true;
			},
			votesInfoList() {
				this.isVote = false;
			},
			search() {
				if(!this.isVote) {
					let self = this,
						txt = this.searchTxt.trim();
					if(txt != '') {
						this.paticitesList = [];
						this.originSigners.forEach((item) => {
							if(item.name.indexOf(txt) >= 0 || item.code.toString().indexOf(txt) >= 0) {
								this.paticitesList.push(item);
							}
						})
					} else {
						this.paticitesList = this.originSigners;
					}
				} else {

				}
			},
			goBack() {
				this.$router.push('/index');
			},
			getVoterList() {
				let self = this;
				this.ApiSever.getVoterList().then(res => {
					self.voteList = res.data.data.value;
				});
			},
			getPaticiesList(aid) {
				let self = this;
				this.ApiSever.getPaticitesList(aid).then(res => {
					if(res && res.data && res.data.length > 0)
						self.paticitesList = res.data;
					let presentIndex = 0;
					for(var i = 0, ilen = res.data.length; i < ilen; i++) {
						//请求礼物信息
						self.ApiSever.getPresentsDetail(res.data[i]._id).then(gifts => {
							let giftsInfo = gifts.data;
							console.log('giftNum i', giftsInfo, presentIndex);
							self.paticitesList[presentIndex].giftnum = 0;
							giftsInfo.map((item) => {
								self.paticitesList[presentIndex].giftnum += item.num;
							})

							self.paticitesList[presentIndex].money = parseFloat(self.paticitesList[presentIndex].giftnum / self.money).toFixed(2);
							presentIndex++;
							if(presentIndex == i) {
								self.originSigners = self.paticitesList;
								self.$forceUpdate();
							}
						});
					}
				});
			},
			//修改参与者信息
			updateSigner(row) {
				let this_ = this;
				row.votenum = !row.votenum ? 0 : parseInt(row.votenum);
				this.ApiSever.updateSinger(row._id, row).then(res => {
					this_.$refs['span_' + row._id].className = 'show';
					this_.$refs['input_' + row._id].className = 'hide';
					this_.$message({
						message: '更新投票数成功！',
						type: 'success'
					});
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
			handleEdit(index, row) {
				this.updateSigner(row);
			},

			//双击单元格修改信息
			editororderData(row, column, cell, event) {
				if(column.label == "已投票数") {
					this.$refs['span_' + row._id].className = 'hide';
					this.$refs['input_' + row._id].className = 'show';
				}
			},
		},
		mounted() {
			// if(this.activeId) {
			// 	this.$router.push('/index');
			// }
			this.getMoney();
			this.getVoterList();
			this.getPaticiesList(this.activeId);
		}
	}
</script>

<style type="text/css" scoped>
	.hide {
		display: none;
	}
	
	.show {
		display: block;
	}
</style>