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
				<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-back" @click="goBack">返回</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="signerList" style="width: 100%;" border @cell-dblclick="editororderData">
			<el-table-column prop="name" label="报名者">
			</el-table-column>
			<el-table-column prop="phone" label="手机号">
			</el-table-column>
			<el-table-column prop="headimgurl" label="缩略图">
				<template slot-scope="scope">
					<div class="config_log" v-if="scope.row&&scope.row.pics.length>0" v-for="(list, index) in scope.row.pics">
						<img :src="imgURL+list" alt="" @click="previewImg(scope.row.pics)" />
					</div>
				</template>
			</el-table-column>
			<!-- <el-table-column label="审核状态">
				<template slot-scope="scope">
					<div class="productTr">
						<span :ref="'span_'+scope.row._id">{{scope.row.status | reviewStatus}}</span>
						<div class="hide" :ref="'state_'+scope.row._id">
							<el-select v-model="scope.row.status" @change="updateSingerStatus(scope.row)" placeholder="请选择">
								<el-option label="审核通过" value="1">
								</el-option>
								<el-option label="审核不通过" value="0">
								</el-option>
							</el-select>
						</div>
					</div>
			
				</template>
			</el-table-column> -->
		</el-table>

		<el-dialog center title="图像预览" :visible.sync="dialogVisible" :before-close="handleClose">
			<template>
				<el-carousel :interval="4000" type="card" height="200px">
					<el-carousel-item v-if="pics&&pics.length>0" v-for="item in pics" :key="item">
						<img :src="imgURL+item" style="max-width:600px;" />
					</el-carousel-item>
				</el-carousel>
			</template>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'signers',
		data() {
			return {
				activeId: this.$route.params.id,
				imgURL: this.ApiSever.imgUrl,
				pics: [],
				dialogVisible: false,
				signerList: [],
				originData: [],
				searchTxt: ''
			}
		},
		methods: {
			search() {
				let self = this,
					txt = this.searchTxt.trim();
				if(txt != '') {
					this.signerList = [];
					this.originData.forEach((item) => {
						if(item.name.indexOf(txt) >= 0 || item.phone.indexOf(txt) >= 0) {
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
			getSignerList(aid) {
				let self = this;
				this.ApiSever.getPaticitesList(aid).then(res => {
					let result = res.data;
					if(result && result.length > 0) {
						self.signerList = result.map((item) => {
							item.status = item.status.toString();
							self.originData.push(item);
							return item;
						});

					}
				});
			},
			updateSingerStatus(row) {
				let self = this;
				let newRow = Object.assign({}, row, {
					status: parseInt(row.status)
				});
				this.ApiSever.updateSinger(row._id, newRow).then(res => {
					self.$message({
						message: '修改成功！',
						type: 'success'
					});
					self.$refs['span_' + row._id].className = 'show';
					self.$refs['state_' + row._id].className = 'hide';
					console.log('update singer success', res);
				})
			},

			//双击单元格修改信息
			editororderData(row, column, cell, event) {
				if(column.label == "审核状态") {
					this.$refs['span_' + row._id].className = 'hide';
					this.$refs['state_' + row._id].className = 'show';
				}
			},
		},
		mounted() {
			this.getSignerList(this.activeId);
		}
	}
</script>

<style type="text/css" scoped>
	.demo-form-inline {
		margin-top: 20px;
	}
	
	.config_log {
		width: 80px;
		height: 60px;
		margin: auto auto;
	}
	
	.config_log img {
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding: 4px;
		box-sizing: border-box;
		border: 1px solid #d9d9d9;
		cursor: pointer;
	}
	
	.hide {
		display: none;
	}
	
	.show {
		display: block;
	}
</style>