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
			<!-- <el-form-item>
				<el-button type="primary" icon="el-icon-tickets" v-on:click="votesStatic">投票者统计信息</el-button>
			</el-form-item> 
			<el-form-item>
				<el-button type="primary" icon="el-icon-tickets" v-on:click="votesInfoList">投票选项投票信息</el-button>
			</el-form-item>-->
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
			<el-table-column prop="words" label="内容简述">
				<template scope="scope">
					<div>{{scope.row.words}}</div>
				</template>
			</el-table-column>
		</el-table>
		<el-table :data="paticitesList" v-else style="width: 100%;" border @cell-dblclick="editororderData">
			<el-table-column type="expand">
				<template slot-scope="props">
					<div class="info_dec">
						<label for="">内容简述:</label>
						<span>{{ props.row.words }}</span>
					</div>

				</template>
			</el-table-column>
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
			<!-- <el-table-column prop="giftnum" label="礼物数">
			</el-table-column>
			<el-table-column prop="money" label="礼物总额">
			</el-table-column> -->			
			<!--<el-table-column label="操作">
				<template slot-scope="scope">
			        <el-button @click="handleDelClick(scope.$index,scope.row)" type="text" size="small">删除</el-button>
			      </template>
			</el-table-column>-->
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
				isVote: false,
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
					if(res && res.data && res.data.length > 0) {
						self.paticitesList = res.data;
						self.originSigners = self.paticitesList;
					}
					//let presentIndex = 0;
					// for(var i = 0, ilen = res.data.length; i < ilen; i++) {
					// 	self.paticitesList[i].money = 0;
					// 	self.paticitesList[i].giftnum = 0;
					// 	//请求礼物信息
					// 	self.ApiSever.getPresentsDetail(res.data[i]._id).then(gifts => {
					// 		let giftsInfo = gifts.data;
					// 		console.log('giftNum i', giftsInfo, presentIndex);
					// 		self.paticitesList[presentIndex].giftnum = giftsInfo.length.toString();

					// 		// giftsInfo.map((item) => {
					// 		// 	self.paticitesList[presentIndex].giftnum += item.num;
					// 		// })

					// 		var giftIndex = presentIndex,giftItemIndex = 0;
					// 		presentIndex++;
					// 		self.paticitesList[giftIndex].money = 0;
					// 		for(var j = 0,jlen = giftsInfo.length; j < jlen; j ++){
					// 			let gid = giftsInfo[j].gid;
					// 			self.ApiSever.getPresent(gid).then(giftlist => {
					// 				let gift = giftlist.data;
					// 				if(gift && gift.length > 0) {
					// 					let prize = parseFloat(self.paticitesList[giftIndex].money);
					// 					prize+= parseFloat(gift[0].num / self.money);
					// 					prize = prize.toFixed(2);
					// 					self.paticitesList[giftIndex].money =prize;
					// 					giftItemIndex++;	
					// 					if(giftItemIndex == jlen && presentIndex == ilen) {
					// 						alert('gift:'+prize+'i:'+giftIndex+'j:'+j);
					// 						self.originSigners = self.paticitesList;
					// 						self.$forceUpdate();
					// 					}					
					// 				}
					// 			});
					// 		}

					// 		if(presentIndex == ilen) {
					// 			self.originSigners = self.paticitesList;
					// 			self.$forceUpdate();
					// 		}

					// 		//self.paticitesList[presentIndex].money = parseFloat(self.paticitesList[presentIndex].giftnum / self.money).toFixed(2);
					// 		//self.$forceUpdate();
					// 	});
					// }
				});
			},
			delSigner(row) {
				let this_ = this;
				this.ApiSever.delSigner(row._id).then(res => {
					this_.$message({
						message: '删除成功！',
						type: 'success'
					});

					//重新加载页面
					setTimeout(function() {
						window.location.reload();
					}, 3000)
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
					if(res && res.data) {
						self.money = res.data.prize;
					}
				});
			},
			handleEdit(index, row) {
				this.updateSigner(row);
			},

			//删除某一行数据
			handleDelClick(index, row) {
				this.delSigner(row);
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
			//this.getVoterList();
			let this_ = this;
			setTimeout(function() {
				this_.getPaticiesList(this_.activeId);
			}, 500)

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
	
	.div_words {
		width: 100%;
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.info_dec {
		line-height: 24px;
		text-align: left;
		font-size: 14px;
		display: block;
		overflow: hidden;
		text-align: justify;
	}
	
	.info_dec label {
		padding-right: 6px;
		font-weight: 600;
	}
</style>