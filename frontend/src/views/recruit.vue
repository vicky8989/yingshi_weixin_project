<template>
	<div id="recruit">
		<div class="recruit-detail">
			<form action="" class="recruit-form">
				<div><label>选手姓名</label>
					<input type="text" placeholder="请输入姓名" v-model="user.name" name="name" @blur="handleBlur" ref="name" />
					<span class="hiden" ref="name_span">请输入姓名</span>
				</div>
				<!--<div><label>事迹简述</label>-->
				<div><label>内容简述</label>
					<textarea placeholder="请输入备注" v-model="user.words" name="declaration" @blur="handleBlur" ref="declaration"></textarea>
					<span class="hiden" ref="declaration_span">请输入内容简述</span>
				</div>
				<div><label>联系电话</label>
					<input type="tel" placeholder="请输入联系电话" v-model="user.phone" name="phone" @blur="handleBlur" ref="phone" />
					<span class="hiden" ref="phone_span">请输入联系电话</span>
				</div>
				<div>
					<label class="photo">请上传1-3张照片，第一张为封面图</label>
					<div class="input_div photo_div">
						<div class="input_photo bg_cover" v-if="thumbPic&&thumbPic.length>0" v-for="(list, index) in thumbPic" :style="{backgroundImage: 'url('+imgURL+list+')'}">
							<img :src="imgURL+list" @load="successLoadImg" @error="errorLoadImg" />
							<i class="close" @click="deletePhoto(index)">×</i>
						</div>
						<div class="input_photo bg_cover" v-if="!thumbPic||thumbPic.length < 3">
							<img src="./../assets/images/imgadd.png" ref="regPhoto" />
							<input v-if="!thumbPic||thumbPic.length<3" type="file" multiple placeholder="请选择" name="thumbPic" ref="thumbPic" accept="image/*" class="imgOne" @change="updataOne" />
							<span class="hiden" ref="thumbPic_span">请上传生活照</span>
						</div>
					</div>
				</div>
			</form>
			<div class="submitBtn">
				<p>请如实填写报名信息 获取参赛资格！</p>
				<span href="javascript:;" class="submit_btn" @click="submitData">提交报名</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { Indicator,Toast, MessageBox } from 'mint-ui';
	//文本框校验正则
	let rejson = {
		name: /\S/,
		declaration: /^.{3,5000}$/,
		phone: /^1[34578]\d{9}$/
	};

	//手机号码校验
	let isMob = /^((\+?86)|(\+86))?(17[012356789][0-9]{8}|13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;

	export default {
		data() {

			return {
				user:{
					aid: this.ApiSever.AID,
				    openid: "0xadcbf2324460caddeff",
				    name: "",
				    phone: "",
					words: "",
					hot: 0,
				    voteNum: 0,
				    pics: [],
				    status: 0
				},
				imgURL: this.ApiSever.imgUrl,
      			uploadURL:this.ApiSever.uploadUrl,
				thumbPic: [],
				timer:null
			}
		},
		created() {
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
						if(rejson[name].test(this.user[name]) || isMob.test(this.user[name])) {
							this.$refs[name + '_span'].className = 'hiden';
						} else {
							this.$refs[name + '_span'].className = 'errShow';
							bOk = false;
						}
					} else {
						if(!rejson[name].test(this.user[name])) {
							this.$refs[name + '_span'].className = 'errShow';
							bOk = false;
						} else {
							this.$refs[name + '_span'].className = 'hiden';
						}
					}
				}
				let resultPhoto = [...this.thumbPic];
				if(resultPhoto.length == 0) {
					this.$refs['regPhoto'].classList.add('error_photo');
					bOk = false;
				} else {
					if(this.$refs['regPhoto'] && this.$refs['regPhoto'].classList.contains('error_photo')) {
						this.$refs['regPhoto'].classList.remove('error_photo');
					}
					this.user.pics = resultPhoto;
				}

				if(!this.$store.state.wxUser.openid) {
					this_.$toast({
						message: '用户未授权'
					});
					bOk = false;
				}

				if(!bOk) {
					return false;
				}
				let this_ = this,openId = this.$store.state.wxUser.openid;
				let param = Object.assign({}, this_.user,{
					votenum:0,
					openid:openId
				});
				this_.handleaddRecruit(param);				
			},
			//添加报名
			handleaddRecruit (param) {
				let this_ = this;
				this.ApiSever.addRecruit(param).then(res => {
					let result = res.data;

					if(result) {
						this_.$toast({
							message: '提交成功！',
							iconClass: 'icon icon-success'
						});
						this_.user.name = '';
						this_.user.words = '';
						this_.user.phone = '';
						this_.user.pics = [];
						this_.thumbPic = [];

						this_.$router.push({
							path: '/index'
						});
					}
				});
			},
			AutoResizeImage(maxWidth,maxHeight,objImg){
				var img = new Image();
				img.src = objImg.src;
				var hRatio;
				var wRatio;
				var Ratio = 1;
				var w = img.width;
				var h = img.height;
				wRatio = maxWidth / w;
				hRatio = maxHeight / h;
				if (maxWidth ==0 && maxHeight==0){
					Ratio = 1;
				}else if (maxWidth==0){//
				if (hRatio<1) Ratio = hRatio;
				}else if (maxHeight==0){
				if (wRatio<1) Ratio = wRatio;
				}else if (wRatio<1 || hRatio<1){
					Ratio = (wRatio<=hRatio?wRatio:hRatio);
				}
				if (Ratio<1){
					w = w * Ratio;
					h = h * Ratio;
				}
				objImg.height = h;
				objImg.width = w;
			},
			updataOne() {
				var len = $('.imgOne').get(0).files.length;
				if(len > 3) {
					this.$toast({
						message: '最多允许上传3张图片！',
						customClass:'large-font'
					});
					return;
				}
				var vm = this,index=0,formData = new FormData();
				for(index = 0; index < len; index++){
					let file = $('.imgOne').get(0).files[index];
					//alert('图片大小'+file.size);
					if(file.size/(1024*1024) <= 3.0)
						formData.append("images", file);
					else{
						this.$toast({
							message: '请选择不大于3M的图片！',
							customClass:'large-font'
						});
					}

					// let fd = new FileReader();
					// fd.readAsDataURL(file);
					// fd.onload = function() {
					// 	if(fd.result) {
					// 		formData.append("image", file);
					// 	}else {
					// 		MessageBox.alert("上传图片失败");
					// 	}
					// }
				}
				
				Indicator.open('上传中...');
				$.ajax({
					url: vm.uploadURL,
					type: 'POST',
					data: formData,
					cache:false,
					processData: false,
					contentType: false,
					// xhrFields: {
					//   withCredentials: true
					// },
					timeout: 30000, //超时时间：30秒
					success: function(responseStr) {
						var result = responseStr;
						Indicator.close();
						$('.imgOne').val("");
						result.map((item)=>{
							vm.thumbPic.push(item.filename);
						})
						
						if(vm.$refs['regPhoto'] && vm.$refs['regPhoto'].classList.contains('error_photo')) {
							vm.$refs['regPhoto'].classList.remove('error_photo');
						}
					},
					error: function(responseStr, textStatus, errorThrown) {
						// alert(responseStr.status);
						// 	alert(responseStr.readyState);
						// 	alert(textStatus);
						//MessageBox.alert('上传失败'+responseStr+','+textStatus+','+errorThrown);
						Indicator.close();
					}
				});
			},

			//删除照片
			deletePhoto(index) {
				let self = this;
				let filename = this.thumbPic[index];
			    this.ApiSever.delActivityImg(filename).then(res => {
			        console.log('del gift img',filename);
			        self.thumbPic.splice(index, 1);
			    });
			}
		},
		mounted() {
			if(!this.ApiSever.AID) {
				this.$router.go(-1);
			} else {
				let openId = this.$store.state.wxUser.openid;
				let this_ = this;
				//如果当前已经报过名了，不能再报名了。
				this.ApiSever.getUserDataByID(openId,this.ApiSever.AID).then(res => {
					if(res.data && res.data.length > 0) {
						this_.$toast({
							message: '您已经报过名了！',
							customClass:'large-font'
						});
						this_.timer=setTimeout(function(){
							this_.$router.go(-1);
						},3000);
					}					
				});
			}
		},
		destroyed() {
			clearTimeout(this.timer);
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
		font-size: 0.75rem
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