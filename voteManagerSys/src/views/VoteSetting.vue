<template>
	<div>
		<div class="index_source">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>图文投票</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-tabs v-model="activeName" disabled type="border-card" @tab-click="handleClick">
			<el-tab-pane label="活动设置" name="first">
				<el-form ref="activityForm" :label-position="labelPosition" :model="activity" label-width="160px" :rules="rules">
					<el-form-item label="活动标题:" prop="name">
						<el-input v-model="activity.name"></el-input>
					</el-form-item>
					<el-form-item label="页面标题:" prop="name">
						<el-input v-model="activity.process"></el-input>
					</el-form-item>
					<el-form-item label="封面:" prop="banner">
						<div class="photo_div">
							<div class="input_photo bg_cover" v-if="activity.banner&&activity.banner.length>0" v-for="(list, index) in activity.banner" @click="handlePictureCardPreview(list)">
								<img :src="imgURL+list" @load="successLoadImg" @error="errorLoadImg" />
								<i class="close el-icon-error" @click="deletePhoto($event,index,'banner')"></i>
							</div>
							<div class="input_photo bg_cover" v-if="!activity.banner||activity.banner.length<3">
								<img :src="addImg" ref="regPhoto" />
								<input v-if="!activity.banner||activity.banner.length<3" type="file" multiple="multiple" placeholder="请选择" name="thumbPic" ref="thumbPic" class="imgOne" @change="updataOne" />
							</div>
							<span class="dec">注：请上传三张***大的图片</span>
						</div>
					</el-form-item>
					<el-form-item label="活动简介:" prop="info">
						<el-input type="textarea" v-model="activity.info"></el-input>
					</el-form-item>
					<el-form-item label="如何参与:" prop="participation">
						<el-input type="textarea" v-model="activity.participation"></el-input>
					</el-form-item>
					<el-form-item label="活动规则:" prop="rule">
						<el-input type="textarea" v-model="activity.rule"></el-input>
					</el-form-item>
					<el-form-item label="宣传图片:">
						<div class="input_photo bg_cover" v-if="activity.infoimg!=null && activity.infoimg !=''" @click="handlePictureCardPreview(activity.infoimg)">
							<img :src="imgURL+activity.infoimg" @load="successLoadImg" @error="errorLoadImg" />
							<i class="close el-icon-error" @click="deletePhoto($event,-1,'info')"></i>
						</div>
						<div class="input_photo bg_cover" v-else>
							<img :src="addImg" ref="regPhoto" />
							<input type="file" placeholder="请选择" name="infoImg" ref="infoImg" class="infoImg" @change="updateInfoImg" />
						</div>
					</el-form-item>
					<el-form-item label="默认活动浏览量:" prop="pv">
						<el-input v-model.number="activity.pv"></el-input>
					</el-form-item>
					<el-form-item label="报名时间:" prop="date">
						<el-col :span="11">
							<el-date-picker type="date" placeholder="选择日期" v-model="activity.enrolstart" style="width: 100%;" :picker-options="pickerOptions1" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="11">
							<el-date-picker type="date" placeholder="选择日期" v-model="activity.enrolend" style="width: 100%;" :picker-options="pickerOptions0" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
						</el-col>
					</el-form-item>
					<el-form-item label="投票时间:" prop="date">
						<el-col :span="11">
							<el-date-picker type="date" placeholder="选择日期" v-model="activity.votestart" style="width: 100%;" :picker-options="pickerOptions4" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="11">
							<el-date-picker type="date" placeholder="选择时间" v-model="activity.voteend" style="width: 100%;" :picker-options="pickerOptions3" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
						</el-col>
					</el-form-item>
					<!-- <el-form-item label="限制每天投票数:" prop="confineVoteNum" :rules="[
              { required: true, message: '限制每天投票数不能为空'},
              { type: 'number', message: '限制每天投票数必须为数字值'}
            ]">
          <el-input type="text" v-model.number="activity.confineVoteNum" auto-complete="off"></el-input>
        </el-form-item>-->
					<el-form-item label="协办方单位名称:" prop="sponsor">
						<el-input v-model="activity.sponsor"></el-input>
					</el-form-item>
					<el-form-item label="客服微信号:" prop="contact">
						<el-input v-model="activity.contact"></el-input>
					</el-form-item>
					<div class="div_footer">
						<el-button type="primary" @click="onSubmit">保存,下一步</el-button>
						<el-button type="danger" @click="resetForm('activityForm')">重置</el-button>
						<el-button type="primary" @click="goBack">返回</el-button>
					</div>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="奖品设置" name="second">
				<el-table :data="awards" class="tb-edit" style="width: 100%" highlight-current-row border>
					<el-table-column label="奖品等级名称">
						<template scope="scope">
							<span v-if="!scope.row.state">{{scope.row.name}}</span>
							<div v-if="scope.row.state">
								<el-input v-if="editorData" size="small" v-model="editorData.name" placeholder="奖品等级名称" @change="handleEdit(scope.$index, scope.row)"></el-input>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="奖品名称">
						<template scope="scope">
							<span v-if="!scope.row.state">{{scope.row.prizeinfo}}</span>
							<div v-if="scope.row.state">
								<el-input v-if="editorData" size="small" v-model="editorData.prizeinfo" placeholder="奖品名称" @change="handleEdit(scope.$index, scope.row)"></el-input>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="奖品图片">
						<template slot-scope="scope">
							<div v-if="!scope.row.state" class="config_log">
								<img v-if="scope.row&&scope.row.prizeimg" :src="imgURL+scope.row.prizeimg" alt="" @click="previewImg(scope.row.prizeimg)" />
							</div>
							<div v-if="scope.row.state">
								<img v-if="editorData&&editorData.prizeimg" :src="imgURL+editorData.prizeimg" alt="" @click="previewImg(editorData.prizeimg)" class="editor_img" />
								<span class="div_upload">
								 <el-button type="primary" size="mini" class="div_btn">上传图片</el-button>
								<input type="file" placeholder="请选择" name="awardPic" ref="awardPic" class="awardPic" @change="changeAwardPic(scope.$index,scope.row)" />
								</span>
							</div>
						</template>

						<!--<template scope="scope">
							<el-input size="small" class="input_prizeimg" v-model="scope.row.prizeimg" placeholder="图片"></el-input>
							<input type="file" placeholder="请选择" name="awardPic" ref="awardPic" class="awardPic" @change="updataAwardPic(scope.$index,scope.row)" />
							<el-button type="text" @click="previewImg(scope.row.prizeimg)">预览</el-button>
						</template>-->
					</el-table-column>
					<el-table-column label="奖品数量">
						<template scope="scope">
							<span v-if="!scope.row.state">{{scope.row.num}}</span>
							<div v-if="scope.row.state">
								<el-input v-if="editorData" size="small" v-model="editorData.num" placeholder="奖品数量"  type="number"></el-input>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
							<el-button v-if="!scope.row.state" size="small" type="primary" icon="el-icon-edit-outline" @click="handleEditor(scope.$index, scope.row)">编辑</el-button>
							<el-button v-if="scope.row.state" size="small" type="primary" icon="el-icon-edit-outline" @click="handleSave(scope.$index, scope.row)">保存</el-button>
							<el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="div_footer">
					<el-button type="primary" @click="onFinishSetting">保存,下一步</el-button>
					<el-button type="success" @click="addPrize(activeId)">继续添加奖品</el-button>
				</div>

				</el-form>
			</el-tab-pane>
		</el-tabs>
		<el-dialog title="预览奖品" :visible.sync="dialogVisible" :before-close="handleClose" center>
			<img :src="imgURL+previewImgURL" style="max-width:600px;" />
		</el-dialog>
	</div>
</template>

<script>
	import Vue from 'vue';
	//import operateRow from '../components/operateRow';

	let vueIns = null;
	export default {
		name: 'setting',
		components: {
			//'quill-editor':quillEditor,
			//'table-operation':operateRow
		},
		data() {
			return {
				labelPosition: 'right',
				addImg: 'static/img/imgadd.png',
				activeId: this.$route.params.id,
				activeName: 'first',
				awards: [],
				dialogVisible: false,
				previewImgURL: '',
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 100,
							message: '长度在 3 到 100 个字符',
							trigger: 'blur'
						}
					],
					banner: [{
						required: true,
						message: '请上传banner图片'
					}],
					// date: [
					//   { type: 'date', required: true, message: '请选择日期'}
					// ],
					info: [{
						required: true,
						message: '请输入活动介绍'
					}],
					participation: [{
						required: true,
						message: '请输入如何参与'
					}],
					rule: [{
						required: true,
						message: '请输入规则介绍'
					}],
					sponsor: [{
						required: true,
						message: '请输入协办方单位名称'
					}],
					contact: [{
						required: true,
						message: '请输入客服微信号'
					}],
					pv: [{
							required: true,
							message: '请输入默认活动浏览量'
						},
						{
							type: 'number',
							message: '年龄必须为数字值'
						}
					]
				},
				activity: {
					"name": "",
					"status": 1,
					"enrolstart": "",
					"enrolend": "",
					"votestart": "",
					"voteend": "",
					"participation": "",
					"process": "",
					"contact": "",
					"info": "",
					"infoimg": "",
					"sponsor": "",
					"banner": [],
					"pv": 0,
					"rule": "第二个活动的规则"
				},
				thumbPic: [],
				imgURL: this.ApiSever.imgUrl,
				uploadURL: this.ApiSever.uploadUrl,
				nofilelist: false,
				noMulti: false,
				dialogImageUrl: '',
				dialogVisible: false,
				pickerOptions1: {
					disabledDate(time) {
						return(vueIns.$moment(time).isAfter(vueIns.$moment(vueIns.activity.enrolend)));
					}
				},
				pickerOptions0: {
					disabledDate(time) {
						return(vueIns.$moment(time).isBefore(vueIns.$moment(vueIns.activity.enrolstart)));
					}
				},
				pickerOptions4: {
					disabledDate(time) {
						return(vueIns.$moment(time).isBefore(vueIns.$moment(vueIns.activity.enrolend)));
					}
				},
				pickerOptions3: {
					disabledDate(time) {
						return(vueIns.$moment(time).isBefore(vueIns.$moment(vueIns.activity.votestart)));
					}
				},
				editorData: null
			}
		},
		methods: {
			//奖品--点击编辑出现input框
			handleEditor(index, row) {
				if(this.editorData) {
					this.$message.error('你还有未保存的编辑信息！');
					return false;
				}
				for(let item in this.awards) {
					if(this.awards[item].hasOwnProperty('state')) {
						delete this.awards[item].state;
					}
				}
				let currentData = Object.assign({}, row, {
					state: true
				})
				this.awards.splice(index, 1, currentData);
				this.editorData = Object.assign({}, row);
			},

			//奖品--点击保存,隐藏input框
			handleSave(index, row) {
				let self = this;
				if(!self.editorData.name || self.editorData.prizeinfo | !self.editorData.prizeimg) {
					this.$message.error('奖品信息不能为空，请完善奖品信息！');
					return false;
				}
				this.ApiSever.updatePrize(self.editorData).then(res => {
					self.awards.splice(index, 1, self.editorData);
					self.editorData = null;
					console.log('update prize', res);
				});

			},

			//奖品--校验奖品数量
			handleBlur(event) {
				let reg = /^\d{n}$ /;
				let value = parseInt(event.target.value);
				if(reg.test(value)) {
					this.editorData['num'] = value;
				} else {
					this.$message.error('奖品数量必须为数字');
					this.editorData['num'] = 0;
				}

			},

			//返回首页
			goBack() {
				this.$router.push('/index');
			},

			//重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleClose() {
				this.dialogVisible = false;
			},

			//预览奖品图片
			previewImg(imgurl) {
				if(imgurl != '') {
					this.previewImgURL = imgurl;
					this.dialogVisible = true;
				}
			},
			successLoadImg() {

			},
			//删除某个banner图片
			deletePhoto(event, index, type) {
				event.preventDefault();
				event.stopPropagation();
				this.dialogVisible = false;
				let filename = '';
				if(type == 'banner') {
					filename = this.activity.banner[index];
					this.activity.banner.splice(index, 1);
				} else {
					filename = this.activity.infoimg;
					this.activity.infoimg = '';
				}
				if(!filename || filename == '') this.$message('当前没有可删除的图片');

				let self = this;
				this.ApiSever.delActivityImg(filename).then(res => {
					if(res) {
						self.$forceUpdate();
					}
				});
			},
			errorLoadImg() {

			},

			//获取当前是否是投票阶段
			getIsActivity() {
				let isActive = this.$moment(new Date()).isBetween(this.activity.votestart, this.activity.voteend);
				return isActive == true ? 1 : 0;
			},
			//保存按钮
			onSubmit() {
				let self = this;
				this.$refs["activityForm"].validate((valid) => {
					if(valid) {
						console.log('submit!', self.activity);
						self.activity.status = 1;
						if(!this.activeId) {
							//新增
							self.ApiSever.addActivityInfo(self.activity).then(res => {
								if(res.data) {
									this.$message('新增活动详情成功！');
									self.activeId = res.data;
									self.activeName = 'second';
								}
							});
						} else {
							//更新
							self.ApiSever.updateActivityInfo(self.activity).then(res => {
								if(res.data) {
									this.$message('更新活动详情成功！');
									self.activeName = 'second';
								}
							});
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			onFinishSetting() {
				console.log('finish setting prizes');
				this.$router.push('/index');
			},

			//查看照片
			handlePictureCardPreview(imgUrl) {
				this.dialogImageUrl = this.imgURL + imgUrl;
				this.dialogVisible = true;
			},

			delPrize(index, rows) {
				console.log('del row', index);
				rows.splice(index, 1);
			},
			//上传宣传图片
			updateInfoImg() {
				var vm = this;
				if($('.infoImg').get(0).files[0].type.indexOf("image") != -1) {
					var fd = new FileReader();
					fd.readAsDataURL($('.infoImg').get(0).files[0]);
					fd.onload = function() {
						if(fd.result) {
							var formData = new FormData();
							formData.append("image", $('.infoImg').get(0).files[0]);
							$.ajax({
								url: vm.uploadURL,
								type: 'POST',
								data: formData,
								cache: false,
								// xhrFields: {
								// 	'Access-Control-Allow-Origin': '*'
								// },
								processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
								contentType: false, // 不设置Content-type请求头
								success: function(responseStr) {
									var result = responseStr;
									vm.activity.infoimg = result.filename;
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

			//上传照片
			updataOne() {
				var vm = this;
				if($('.imgOne').get(0).files[0].type.indexOf("image") != -1) {
					var fd = new FileReader();
					fd.readAsDataURL($('.imgOne').get(0).files[0]);
					fd.onload = function() {
						if(fd.result) {
							var formData = new FormData();
							formData.append("image", $('.imgOne').get(0).files[0]);
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
									if(!vm.activity.banner) vm.activity.banner = [];
									vm.activity.banner.push(result.filename);
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

			/////////////////////表格方法/////////////////////////
			//奖品信息
			getPrizes(aid) {
				let self = this;
				this.ApiSever.getPrizes(aid).then(res => {
					if(res.data) {
						self.awards = res.data;
					}
				});
			},
			delPrize(row) {
				let self = this;
				this.ApiSever.delPrize(row._id).then(res => {
					if(res.data) {

					}
				});
			},

			//添加奖品
			addPrize(id) {
				let self = this;
				//判断是否有正在编辑未保存的数据
				if(this.editorData) {
					this.$message.error('你还有未保存的编辑信息！');
					return false;
				}
				let awardsData = self.awards;
				if(awardsData.length > 0) {
					let previous = awardsData.length - 1;

					let currentData = awardsData[previous];
					if(!currentData.name || !currentData.num || !currentData.prizeinfo || !currentData.prizeimg) {
						self.$message.error('请完善上一条信息再添加！');
						return false;
					}
				}
				let newPrize = {
					name: '',
					num: 1,
					prizeinfo: null,
					prizeimg: null,
					info: "得了一等奖才能拿到呦"
				};
				newPrize.aid = id;
				this.ApiSever.addPrize(newPrize).then(res => {
					if(res.data) {
						newPrize._id = res.data;
						this.awards.push(newPrize);
					}
				});
			},

			//新增奖品图片
			updataAwardPic(rowindex, row) {
				var vm = this;
				if($('.awardPic').get(rowindex).files[0].type.indexOf("image") != -1) {
					var fd = new FileReader();
					fd.readAsDataURL($('.awardPic').get(rowindex).files[0]);
					fd.onload = function() {
						if(fd.result) {
							var formData = new FormData();
							formData.append("image", $('.awardPic').get(rowindex).files[0]);
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
									row.prizeimg = result.filename;
									vm.updatePrize(row);
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

			//编辑时修改图片
			changeAwardPic(rowindex, row) {
				var vm = this;
				if($('.awardPic').get(0).files[0].type.indexOf("image") != -1) {
					var fd = new FileReader();
					fd.readAsDataURL($('.awardPic').get(0).files[0]);
					fd.onload = function() {
						if(fd.result) {
							var formData = new FormData();
							formData.append("image", $('.awardPic').get(0).files[0]);
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
									vm.editorData.prizeimg = result.filename;
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
			updatePrize(row) {
				this.ApiSever.updatePrize(row).then(res => {
					console.log('update prize', res);
				});
			},
			getPrizeInfos(row, event, column) {
				console.log(row, event, column, event.currentTarget)
			},
			handleEdit(index, row) {
				this.updatePrize(row);
			},

			//删除奖品
			handleDelete(index, row) {
				let self = this;
				if(this.editorData) {
					this.editorData = null;
				}
				this.$confirm('删除此信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.ApiSever.delPrize(row._id).then(res => {
						self.awards.splice(index, 1); //把该项从数据中删除
					});
				}).catch(() => {
					self.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},

			//活动设置信息
			getActivityInfo(activityId) {
				//Indicator.open('加载中...');
				let self = this;
				this.ApiSever.getActivityInfo(activityId).then(res => {
					if(res.data && res.data.length > 0)
						self.activity = res.data[0];
				});
			},

		},
		created() {
			vueIns = this
		},
		mounted() {
			this.$nextTick(function() {
				if(vueIns.activeId) {
					vueIns.getActivityInfo(vueIns.activeId);
					vueIns.getPrizes(vueIns.activeId); //请求奖品
				}
			});

		}
	}
</script>
<style lang="less" scoped>
	.index_source {
		border-bottom: 1px solid #d6d6d6;
		padding-bottom: 14px;
		margin-bottom: 24px;
	}
	
	.input_photo {
		position: relative;
		margin-top: 6px;
		margin-left: 20px;
		width: 80px;
		height: 80px;
		float: left;
	}
	
	.input_photo .close {
		position: absolute;
		top: 0;
		right: 0;
		margin-top: -8px;
		margin-right: -8px;
		width: 16px;
		height: 16px;
		line-height: 16px;
		background: #fff;
		color: #666;
		text-align: center;
		font-size: 18px;
		font-weight: 600;
		cursor: pointer;
		color: red;
	}
	
	.input_photo img {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		max-height: 100%;
		max-width: 100%;
	}
	
	.photo_div {
		height: 100px;
	}
	
	.photo_div .dec {
		color: red;
		line-height: 100px;
		font-size: 14px;
		padding-left: 20px;
	}
	
	.imgOne,
	.infoImg {
		position: absolute;
		top: 0;
		opacity: 0;
		width: 80px;
		height: 80px;
		overflow: hidden;
	}
	
	.bg_cover {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50%;
	}
	
	.errorLoadImgbg_cover {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50%;
		background: #f4f4f4;
	}
	
	.errorMinLoadImgbg_cover {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50%;
		background: #f4f4f4;
	}
	
	.cell-edit-color {
		color: #2db7f5;
		font-weight: bold;
	}
	/* .v-table-rightview {
      max-width:1000px;
  }
  .v-table {
    font-size:14px;
    overflow-x:hidden;
  } */
	
	.input_prizeimg {
		width: 120px;
		float: left;
	}
	
	.upload-prizeimg {
		padding-left: 4px;
		.el-upload--text {
			width: 75px;
			display: inline-block;
			height: 32px;
		}
	}
	
	.div_footer {
		width: 100%;
		height: auto;
		display: block;
		object-fit: inherit;
		text-align: center;
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