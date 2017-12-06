<template>
	<div id="index">
		<el-button v-if="!show" type="primary" icon="el-icon-plus" @click="handleShow">添加图文投票</el-button>
		<div v-if="show">
			<div class="index_source">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>图文投票</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<el-form ref="activityForm" :label-position="labelPosition" :model="activity" label-width="160px">
				<el-form-item label="活动标题:">
					<el-input v-model="activity.title"></el-input>
				</el-form-item>
				<el-form-item label="封面:">
					<div class="photo_div">
						<div class="input_photo bg_cover" v-if="thumbPic&&thumbPic.length>0" v-for="(list, index) in thumbPic" :style="{backgroundImage: 'url('+imgURL+list+')'}" @click="handlePictureCardPreview(list)">
							<img :src="imgURL+list" @load="successLoadImg" @error="errorLoadImg" />
							<i class="close" @click="deletePhoto(index)">×</i>
						</div>
						<div class="input_photo bg_cover" v-if="!thumbPic||thumbPic.length<3">
							<img src="../../assets/image/imgadd.png" ref="regPhoto" />
							<input v-if="!thumbPic||thumbPic.length<3" type="file" multiple="multiple" placeholder="请选择" name="thumbPic" ref="thumbPic" class="imgOne" @change="updataOne" />
						</div>
						<span class="dec">注：请上传三张***大的图片</span>
					</div>
				</el-form-item>
				<el-form-item label="活动简介:">
					<quill-editor ref="activityDec" v-model="activity.contentDec" :config="editorOption" @change="onEditorChange"></quill-editor>
				</el-form-item>
				<el-form-item label="如何参与:">
					<quill-editor ref="contentjoin" v-model="activity.contentJoin" :config="editorOption" @change="onJoinEditorChange"></quill-editor>
				</el-form-item>
				<el-form-item label="流程介绍:">
					<quill-editor ref="contentflow" v-model="activity.contentFlow" :config="editorOption" @change="onFlowEditorChange"></quill-editor>
				</el-form-item>
				<el-form-item label="报名时间:">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="activity.startTime" style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-time-picker type="fixed-time" placeholder="选择时间" v-model="activity.endTime" style="width: 100%;"></el-time-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="投票时间:">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="activity.startVote" style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-time-picker type="fixed-time" placeholder="选择时间" v-model="activity.endVote" style="width: 100%;"></el-time-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="限制投票数:" prop="voteNum" :rules="[
      { required: true, message: '限制投票数不能为空'},
      { type: 'number', message: '限制投票数必须为数字值'}
    ]">
					<el-input type="text" v-model.number="activity.voteNum" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">立即创建</el-button>
					<el-button>取消</el-button>
				</el-form-item>
				<el-form-item label="限制每天投票数:" prop="confineVoteNum" :rules="[
      { required: true, message: '限制每天投票数不能为空'},
      { type: 'number', message: '限制每天投票数必须为数字值'}
    ]">
					<el-input type="text" v-model.number="activity.confineVoteNum" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="限制选项每天投票数:" prop="confineVoteDay" :rules="[
      { required: true, message: '限制选项每天投票数不能为空'},
      { type: 'number', message: '限制选项每天投票数必须为数字值'}
    ]">
					<el-input type="text" v-model.number="activity.confineVoteDay" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="电话:">
					<el-input v-model="activity.tel"></el-input>
				</el-form-item>
				<el-form-item label="是否可以给自己投票:">
					<el-radio-group v-model="activity.resource">
						<el-radio label="可以"></el-radio>
						<el-radio label="不可以"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">保存</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-dialog :visible.sync="dialogVisible" size="tiny">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
	import { quillEditor } from 'vue-quill-editor';

	export default {
		data() {
			return {
				show: false,
				labelPosition: 'right',
				activity: {
					title: '',
					thumbPic: '',
					thumbPic2: '',
					thumbPic3: '',
					contentDec: '<p>活动简介</p>',
					contentJoin: '<p>如何参与</p>',
					contentFlow: '<p>流程介绍</p>',
					startTime: '',
					endTime: '',
					startVote: '',
					endVote: '',
					voteNum: '',
					confineVoteNum: '',
					confineVoteDay: '',
					tel: '',
					resource: ''

				},
				thumbPic: [],
				imgURL: 'http://testhmlfund.artup.com/hmlfund-cms/',
				dialogImageUrl: '',
				dialogVisible: false,
				editorOption: {

				}
			}
		},
		computed: {
			editor() {
				return this.$refs.activityDec.quillEditor;
			},
			joinEditor() {
				return this.$refs.contentjoin.quillEditor;
			},
			flowEditor() {
				return this.$refs.contentflow.quillEditor;
			}
		},
		components: {
			quillEditor
		},
		methods: {
			handleShow() {
				this.show = !this.show;
			},

			//保存按钮
			onSubmit() {
				this.$refs[activityForm].validate((valid) => {
					if(valid) {
						let resultPhoto = [...this.thumbPic];
						if(resultPhoto.length == 1) {
							this.activity.thumbPic = resultPhoto[0];
						} else if(resultPhoto.length == 2) {
							this.activity.thumbPic = resultPhoto[0];
							this.activity.thumbPic2 = resultPhoto[1];

						} else if(resultPhoto.length == 3) {
							this.activity.thumbPic = resultPhoto[0];
							this.activity.thumbPic2 = resultPhoto[1];
							this.activity.thumbPic3 = resultPhoto[2];
						}
						console.log('submit!', this.activity);
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},

			//查看照片
			handlePictureCardPreview(imgUrl) {
				this.dialogImageUrl = this.imgURL + imgUrl;
				this.dialogVisible = true;
			},

			//监听富文本框
			onEditorChange({
				editor,
				html,
				text
			}) {
				this.activity.contentDec = html;
			},

			//如何参与监听富文本框
			onJoinEditorChange({
				joinEditor,
				html,
				text
			}) {
				this.activity.contentJoin = html;
			},

			//流程介绍监听富文本框
			onFlowEditorChange({
				flowEditor,
				html,
				text
			}) {
				this.activity.contentFlow = html;
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
							formData.append("file", $('.imgOne').get(0).files[0]);
							$.ajax({
								url: 'http://testhmlfund.artup.com/hmlfund-cms/webservice/file/upFile',
								type: 'POST',
								data: formData,
								processData: false,
								contentType: false,
								success: function(responseStr) {
									var result = responseStr;
									if(result.success) {
										$('.imgOne').val("");
										vm.thumbPic.push(result.imagePath);
									} else {
										$('.imgOne').val("");
										alert('上传失败')
									}
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
		}
	}
</script>

<style type="text/css" scoped>
	#index {
		width: 100%;
		padding-right: 80px;
		box-sizing: border-box;
	}
	
	.index_source {
		border-bottom: 1px solid #ebebeb;
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
		border-radius: 50%;
		border: 2px solid red;
		color: #666;
		text-align: center;
		font-size: 18px;
		font-weight: 600;
		cursor: pointer;
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
	
	.imgOne {
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
</style>