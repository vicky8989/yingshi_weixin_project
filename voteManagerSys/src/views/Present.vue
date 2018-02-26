<template>
	<div>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
				<label>1元钱对应点数：</label>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="点数" v-model="money" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="medium" icon="el-icon-check" @click="changeMoney">保存</el-button>
				<el-button type="primary" size="medium" icon="el-icon-plus" @click="addPresent()">新增礼物</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="giftList" style="width: 100%" border>
			<el-table-column prop="name" label="礼物名称">
				<template scope="scope">
					<span v-if="!scope.row.state">{{scope.row.name}}</span>
					<div v-if="scope.row.state">
						<el-input v-if="editorData" size="small" v-model="editorData.name" placeholder="请输入礼物名称" @blur="handleBlur($event,'name')"></el-input>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="num" label="点数（点）">
				<template scope="scope">
					<span v-if="!scope.row.state">{{scope.row.num}}</span>
					<div v-if="scope.row.state">
						<el-input v-if="editorData" size="small" v-model.number="editorData.num" placeholder="请输入礼物点数" @blur="handleBlur($event,'num')" type="number"></el-input>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="缩略图">
				<template slot-scope="scope">
					<div v-if="!scope.row.state" class="config_log">
						<img v-if="scope.row&&scope.row.giftimg" :src="imgURL+scope.row.giftimg" alt="" />
					</div>
					<div v-if="scope.row.state">
						<img v-if="editorData&&editorData.giftimg" :src="imgURL+editorData.giftimg" alt="" class="editor_img" />
						<span class="div_upload">
								 <el-button type="primary" size="mini" class="div_btn">上传图片</el-button>
								<input type="file" placeholder="请选择" name="giftPic" ref="giftPic" class="giftPic" @change="changeAwardPic(scope.$index,scope.row)" />
								</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button v-if="!scope.row.state" size="small" type="primary" icon="el-icon-edit-outline" @click="editDetial(scope.$index,scope.row)">编辑</el-button>
					<el-button v-if="scope.row.state" size="small" type="primary" icon="el-icon-check" @click="savePresent(scope.$index,scope.row)">保存</el-button>
					<el-button size="mini" type="danger" icon="el-icon-delete" @click="delPresent(scope.row,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		name: 'present',
		data() {
			return {
				giftList: [],
				imgURL: this.ApiSever.imgUrl,
				uploadURL: this.ApiSever.uploadUrl,
				money: 1,
				addImg: 'static/img/imgadd.png',
				editorData: null
			}
		},
		methods: {
			goBack() {
				this.$router.push('/index');
			},

			//获得礼物列表
			getPresentList() {
				let self = this;
				this.ApiSever.getPresentList().then(res => {
					let result = res.data;
					if(result && result.length > 0) {
						self.giftList = result;
					}

				});
			},

			//保存1块钱对应多少点数
			getMoney() {
				let self = this;
				this.ApiSever.getMoney().then(res => {
					let result = res.data;
					if(result) {
						self.money = result.prize;
					}
				});
			},

			//修改信息显示文本框
			editDetial(index, row) {
				if(this.editorData) {
					this.$message.error('你还有未保存的编辑信息！');
					return false;
				}
				for(let item in this.giftList) {
					if(this.giftList[item].hasOwnProperty('state')) {
						delete this.giftList[item].state;
					}
				}
				let currentData = Object.assign({}, row, {
					state: true
				});
				this.giftList.splice(index, 1, currentData);
				this.editorData = Object.assign({}, row);
			},

			//校验文本框信息
			handleBlur(event, currentName) {
				let reg;
				let value = event.target.value;
				let messageInfo;
				let errorValue;
				if(currentName == 'name') {
					reg = /\S/;
					errorValue = '';
					messageInfo = '礼物名称不能为空！';
				} else if(currentName == 'num') {
					value = parseInt(value);
					reg = /^[0-9]+$/;
					errorValue = 1;
					messageInfo = '礼物点数必须为数字！';
				}
				if(reg.test(value)) {
					this.editorData[currentName] = value;
				} else {
					this.$message.error(messageInfo);
					this.editorData[currentName] = errorValue;
				}

			},

			//保存礼物信息
			savePresent() {
				let self = this;
				if(!this.editorData.name || !this.editorData.num || !this.editorData.giftimg) {
					self.$message({
						message: '请完善礼物信息',
						type: 'error'
					});
					return false;
				}

				this.ApiSever.updatePresent(this.editorData).then(res => {
					self.editorData = null;
					self.getPresentList();
					this.$message({
						message: '修改成功！',
						type: 'success'
					});
					console.log('update prize', res);
				});
			},

			//改变礼物点数和人民币的对应关系
			changeMoney() {
				let self = this;
				let data = {
					prize: parseInt(self.money)
				};
				this.ApiSever.updateMoney(data).then(res => {
					console.log('update money', data);
					this.$message({
						message: '更新价格成功！',
						type: 'success'
					});
				});
			},

			//删除某个礼物图片
			deletePhoto(filename) {
				let self = this;
				this.ApiSever.delActivityImg(filename).then(res => {
					console.log('del gift img', filename);
				});
			},

			//编辑时更新礼物图片
			changeAwardPic(rowindex, row) {
				var vm = this;
				if($('.giftPic').get(0).files[0].type.indexOf("image") != -1) {
					var fd = new FileReader();
					fd.readAsDataURL($('.giftPic').get(0).files[0]);
					fd.onload = function() {
						if(fd.result) {
							var formData = new FormData();
							formData.append("image", $('.giftPic').get(0).files[0]);
							$.ajax({
								url: vm.uploadURL,
								type: 'POST',
								data: formData,
								cache: false,
								xhrFields: {
									'Access-Control-Allow-Origin': '*'
								},
								processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
								contentType: false, // 不设置Content-type请求头
								success: function(responseStr) {
									var result = responseStr;
									vm.editorData.giftimg = result.filename;
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

			//更新礼物图片
			updateGiftPic(rowindex, row) {
				var vm = this;
				if($('.giftPic').get(rowindex).files.length > 0 && $('.giftPic').get(rowindex).files[0].type.indexOf("image") != -1) {
					//					vm.deletePhoto(row.giftimg);
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
								cache: false,
								xhrFields: {
									'Access-Control-Allow-Origin': '*'
								},
								processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
								contentType: false, // 不设置Content-type请求头
								success: function(responseStr) {
									var result = responseStr;
									vm.editorData.giftimg = result.filename;
									//									row.giftimg = result.filename;
									//									vm.updateGift(row);
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
				row.num = !row.num ? 0 : parseInt(row.num);
				row.giftImg = !row.giftimg ? '' : row.giftimg;
				if(row.hasOwnProperty('state')) {
					delete row.state;
				}

				this.ApiSever.updatePresent(row).then(res => {
					this.$message({
						message: '修改成功！',
						type: 'success'
					});
					console.log('update prize', res);
				});
			},
			handleEdit(index, row) {
				this.updateGift(row);
			},
			updateSingerStatus(row) {
				let self = this;
				let newRow = Object.assign({}, row, {
					status: parseInt(row.status)
				});
				this.ApiSever.updateSinger(row._id, newRow).then(res => {
					console.log('update singer success', res);
				})
			},

			//删除礼物
			delPresent(row, index) {
				let self = this;
				if(self.editorData) {
					self.editorData = null;
				}
				this.$confirm('删除此信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.ApiSever.delPresent(row._id).then(res => {
						if(res.data) {
							self.giftList.splice(index, 1);
						}
					});
				}).catch(() => {
					self.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},

			//新增礼物
			addPresent() {
				//判断是否有正在编辑未保存的数据
				if(this.editorData) {
					this.$message.error('你还有未保存的编辑信息！');
					return false;
				}
				let self = this;
				let giftData = self.giftList;
				if(giftData.length > 0) {
					let lastGift = giftData[0];
					if(!lastGift.name || !lastGift.num || !lastGift.giftimg) {
						self.$message({
							message: '请完善上一条信息',
							type: 'error'
						});
						return false;
					}
				}
				let newGift = {
					'name': '',
					'giftimg': '',
					'num': 100
				};

				this.ApiSever.addPresent(newGift).then(res => {
					if(res.data) {
						newGift._id = res.data;
						self.giftList.unshift(newGift);
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

<style type="text/css" scoped>
	.upload-demo {
		display: inline-block;
		margin-left: 10px;
	}
	
	.el-upload__tip {
		display: none;
	}
	
	.active {
		color: red;
		display: block;
	}
	
	.el-button--mini {
		vertical-align: top;
	}
	
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
	
	.editor_img {
		width: 80px;
		height: 60px;
		margin: auto auto;
		overflow: hidden;
		padding: 4px;
		box-sizing: border-box;
		border: 1px solid #d9d9d9;
		cursor: pointer;
		display: inline-block;
	}
	
	.div_upload {
		position: relative;
		width: 80px;
		height: 40px;
		display: inline-block;
		margin-left: 6px;
	}
	
	.div_upload>input {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 80px;
		height: 40px;
		overflow: hidden;
		opacity: 0;
		cursor: pointer;
	}
	
	.div_upload .div_btn {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 80px;
		height: 30px;
		overflow: hidden;
		cursor: pointer;
	}
</style>