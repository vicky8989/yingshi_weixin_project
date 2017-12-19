<template>
	<div id="recruit">
		<div class="recruit-detail">
			<form action="" class="recruit-form">
				<div><label>选手姓名</label>
					<input type="text" placeholder="请输入姓名" v-model="userInfo.name" name="name" @blur="handleBlur" ref="name" />
					<span class="hiden" ref="name_span">请输入姓名</span>
				</div>
				<!--<div><label>参赛宣言</label>-->
				<div><label>参赛宣言</label>
					<textarea placeholder="请输入备注" v-model="userInfo.declaration" name="declaration" @blur="handleBlur" ref="declaration"></textarea>
					<span class="hiden" ref="declaration_span">请输入参赛宣言</span>
				</div>
				<div><label>联系电话</label>
					<input type="tel" placeholder="请输入联系电话" v-model="userInfo.phone" name="phone" @blur="handleBlur" ref="phone" />
					<span class="hiden" ref="phone_span">请输入联系电话</span>
				</div>
				<div>
					<label class="photo">请上传1-3张照片，第一张为封面图</label>
					<div class="input_div photo_div">
						<div class="input_photo bg_cover" v-if="thumbPic&&thumbPic.length>0" v-for="(list, index) in thumbPic" :style="{backgroundImage: 'url('+imgURL+list+')'}">
							<img :src="imgURL+list" @load="successLoadImg" @error="errorLoadImg" />
							<i class="close" @click="deletePhoto(index)">×</i>
						</div>
						<div class="input_photo bg_cover" v-if="!thumbPic||thumbPic.length<3">
							<img src="./../assets/images/imgadd.png" ref="regPhoto" />
							<input v-if="!thumbPic||thumbPic.length<3" type="file" multiple="multiple" placeholder="请选择" name="thumbPic" ref="thumbPic" class="imgOne" @change="updataOne" />
							<span class="hiden" ref="thumbPic_span">请上传生活照</span>
						</div>
					</div>
				</div>

			</form>

			<div class="purchasing">
				<p>请如实填写报名信息 获取参赛资格！</p>
				<span href="javascript:;" class="purchasing_btn" @click="submitData">提交报名</span>
			</div>

		</div>
	</div>
</template>

<script>
	import { Indicator,Toast, MessageBox } from 'mint-ui';
	//文本框校验正则
	let rejson = {
		name: /\S/,
		declaration: /\S/,
		phone: /^([0-9]{3,4}-)?[0-9]{7,8}$/
	};

	//手机号码校验
	let isMob = /^((\+?86)|(\+86))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;

	export default {
		data() {
			
			return {
				userInfo: {
					name: '',
					declaration: '',
					phone: '',
					thumbPic: '',
					thumbPic2: '',
					thumbPic3: ''
				},
				thumbPic: [],
				imgURL: 'http://hanml.artup.com/data'
			}
		},
		created() {
			console.log(this.$route.query)
		},
		components: {
		},
		methods: {
			handleBlur(event) {
				let currentEl = event.target.name;
				if(rejson[currentEl]) {
					if(currentEl == 'phone') {
						if(rejson[currentEl].test(event.target.value) || isMob.test(event.target.value)) {
							this.$refs[currentEl + '_span'].className = 'hiden';
						} else {
							this.$refs[currentEl + '_span'].className = 'errShow';
						}
					} else {
						if(rejson[currentEl].test(event.target.value)) {
							this.$refs[currentEl + '_span'].className = 'hiden';
						} else {
							this.$refs[currentEl + '_span'].className = 'errShow';
						}
					}
				}
			},

			//点击提交按钮事件
			submitData() {
				let bOk = true;
				for(let name in rejson) {
					if(name == 'phone') {
						if(rejson[name].test(this.userInfo[name]) || isMob.test(this.userInfo[name])) {
							this.$refs[name + '_span'].className = 'hiden';
						} else {
							this.$refs[name + '_span'].className = 'errShow';
							bOk = false;
						}
					} else {
						if(!rejson[name].test(this.userInfo[name])) {
							this.$refs[name + '_span'].className = 'errShow';
							bOk = false;
						} else {
							this.$refs[name + '_span'].className = 'hiden';
						}
					}

				}
				let resultPhoto = [...this.thumbPic];
				if(resultPhoto.length < 1) {
					this.$refs['regPhoto'].classList.add('error_photo');
					bOk = false;
				} else {
					if(this.$refs['regPhoto'] && this.$refs['regPhoto'].classList.contains('error_photo')) {
						this.$refs['regPhoto'].classList.remove('error_photo');
					}
					if(resultPhoto.length == 1) {
						this.userInfo.thumbPic = resultPhoto[0];
					} else if(resultPhoto.length == 2) {
						this.userInfo.thumbPic = resultPhoto[0];
						this.userInfo.thumbPic2 = resultPhoto[1];

					} else if(resultPhoto.length == 3) {
						this.userInfo.thumbPic = resultPhoto[0];
						this.userInfo.thumbPic2 = resultPhoto[1];
						this.userInfo.thumbPic3 = resultPhoto[2];
					}
				}

				if(!bOk) {
					return false;
				}
				let param = Object.assign({}, this.userInfo);

				this.ApiSever.service.addRecruit(param).then(res => {
					let result = res.data;

					if(result.success) {
						this.$toast({
							message: '提交成功！',
							iconClass: 'icon icon-success'
						});
						this.userInfo.name = '';
						this.userInfo.declaration = '';
						this.userInfo.phone = '';
						this.userInfo.thumbPic = '';
						this.userInfo.thumbPic2 = '';
						this.userInfo.thumbPic3 = '';
						this.thumbPic = [];
					}
				});
			},

			updataOne() {
				var vm = this;
				if($('.imgOne').get(0).files[0].type.indexOf("image") != -1) {
					var fd = new FileReader();
					Indicator.open('上传中...');
					fd.readAsDataURL($('.imgOne').get(0).files[0]);
					fd.onload = function() {
						if(fd.result) {
							var formData = new FormData();
							formData.append("file", $('.imgOne').get(0).files[0]);
							$.ajax({
								url: 'http://hanml.artup.com/hanml-cms/webservice/file/upFile',
								type: 'POST',
								data: formData,
								processData: false,
								contentType: false,
								success: function(responseStr) {
									var result = responseStr;
									Indicator.close();
									if(result.success) {
										$('.imgOne').val("");
										vm.thumbPic.push(result.imagePath);

										if(vm.$refs['regPhoto'] && vm.$refs['regPhoto'].classList.contains('error_photo')) {
											vm.$refs['regPhoto'].classList.remove('error_photo');
										}
									} else {
										$('.imgOne').val("");
										MessageBox.alert('上传失败')
									}
								},
								error: function(responseStr) {
									MessageBox.alert('上传失败');
									Indicator.close();
								}
							});
						}
					}
				} else {
					alert('上传图片不符合规则，请重新上传');
				}
			},

			deletePhoto(index) {
				let photoData = [...this.thumbPic];
				let result = photoData.splice(index, 1);
				this.thumbPic = [...photoData];
			}
		},
		mounted() {

		},
		destroyed() {

		}
	}
</script>

<style type="text/css" scoped>
	.mint-tab-container {
		background: #fff;
	}
	
	.promptData {
		width: 100%;
		padding-left: 5rem;
		box-sizing: border-box;
		display: block;
		color: red;
		clear: both;
	}
	
	.input_div .errShow {
		padding-left: 0 !important;
	}
	
	.errShow {
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		display: block;
		color: red;
		padding-left: 4.6rem;
		box-sizing: border-box;
		text-align: left;
	}
	
	.hiden {
		display: none;
	}
	
	.change_photo {
		width: 100%;
		height: 1.2rem !important;
		display: block;
	}
	
	.input_photo {
		position: relative;
		margin-top: 0.2rem;
		margin-left: 0.6rem;
		width: 2.6rem;
		height: 2.6rem;
		float: left;
	}
	
	.input_photo .close {
		position: absolute;
		top: 0;
		right: 0;
		margin-top: -0.468rem;
		margin-right: -0.468rem;
		width: 0.9375rem;
		height: 0.9375rem;
		line-height: 0.9375rem;
		background: #fff;
		border-radius: 50%;
		border: 2px solid red;
		color: #666;
		text-align: center;
		font-size: 1rem !important;
		font-weight: 600;
	}
	
	.input_photo img {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		max-height: 100%;
		max-width: 100%;
		margin: auto auto;
	}
	
	.vertical {
		vertical-align: top;
	}
	
	.photo_div {
		height: 3rem !important;
	}
	
	.imgOne {
		position: absolute;
		top: 0;
		opacity: 0;
		width: 2.6rem;
		height: 2.6rem;
		overflow: hidden;
	}
	
	.error_photo {
		border: 1px solid red;
	}
</style>