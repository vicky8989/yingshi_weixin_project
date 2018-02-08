<template>
	<div id="app">
		<Marquee :tips="mtip"></Marquee>
		<!--   <images src="./assets/logo.png">-->
		<div class="wrap">
			<transition name="fade" mode="out-in">
			<!--<transition enter-active-class="next-enter">-->
				<router-view class="full-h" @finishTimeChanged="finishTimeChanged"></router-view>
			</transition>
		</div>
		<BottomNav v-if="isVotePage == false" :isFinished='isVoteFinished'></BottomNav>
	</div>
</template>

<script>
	import Marquee from './views/common/Marquee.vue'
	import BottomNav from './views/common/BottomNav.vue'

	export default {
		data() {
			let day = this.$moment(this.ApiSever.FINSIHTIME).format('YYYY-MM-DD');
			return {
				isVoteFinished: this.ApiSever.getFinishTime(),
				isVotePage: false,
				mtip: `投票时间截至到${day}日`,
				code:null
			}
		},
		name: 'app',
		components: {
			Marquee,
			BottomNav
		},
		watch: {
			'$route' (to, from) {
				this.isVotePage = to.path.indexOf('votes') >= 0;
			},
			'code':'getCodeParam'
		},
		methods: {
			finishTimeChanged(finishTime) {
				let day = this.$moment(this.ApiSever.FINSIHTIME).format('YYYY-MM-DD');
				this.mtip = `投票时间截至到${day}日`;
			},
			getCodeParam() {
				let code = this.$route.query.code;
				//this.$store.dispatch('weixinLogin',code);
				if(code!=null) {
					console.log('code',code);
				}
				return code;
			},
			getWxUserInfo(code) {
				let this_ = this;
				this.ApiSever.getWxUserInfo(code).then(res => {
					console.log('weixin user',res);
					if(res) {
						let info = res.body;
						this_.$store.dispatch('setWeixinUserInfo',info);

						//如果当前已经报过名了，不能再报名了。
						this_.ApiSever.getUserInfo(info.openid).then(res => {
							if(res.data) {
								this_.handleUpdateUser(info);
							} else {
								this_.handleAddUser(info);
							}
						});
					}
				});
			},

			//添加用户信息
			handleAddUser(info) {
				let this_ = this;
				let data = Object.assign({}, info,{});
				this.ApiSever.addUserInfo(data).then(res => {
					console.log('add user',res);
				})
			},

			//更新用户信息
			handleUpdateUser(info) {
				let this_ = this;
				let data = Object.assign({}, info,{});
				this.ApiSever.updateUserInfo(info.openid,data).then(res => {
//					console.log('update user',res);
					//如果当前已经报过名了，不能再报名了。
					// this_.ApiSever.getUserInfo(user.openid).then(isuser => {
					// 	if(isuser.data) {} else {
					// 		//如果当前结果中没有，则新增
					// 		this_.ApiSever.updateUserInfo(user.openid,user).then(useradded => {
					// 			console.log('add usered',useradded);
					// 		})
					// 	}
					// });
				})
			}
		},
		created() {
			this.$store.dispatch("finishtimeChanged");
		},
		mounted() {
			//alert('openid：'+this.$store.state.wxUser.openid);
			//第一次创建的时候存入openid
			var userId = this.$utils.getUrlKey("openid");
			//alert('userId:'+userId);
			if(!this.$store.state.wxUser.openid && !userId) {
				window.location.href =this.ApiSever.OAUTH;
			} else if(!this.$store.state.wxUser.openid && userId){
				this.$store.dispatch('setWeixinUserInfo',{openid:userId});
			}
			// this.ApiSever.weixin_code= this.$utils.getUrlKey("code");
			// console.log('code',this.ApiSever.weixin_code);
			// if(!this.ApiSever.weixin_code) {
			// 	window.location.href =this.ApiSever.OAUTH;
			// } else if(this.$store.wxUser == null){
			// 	this.getWxUserInfo(this.ApiSever.weixin_code);
			// }
		}
	}
</script>

<style lang="less" type="text/css">
	@import './assets/css/main';
	#app {
		text-align: center;
		color: #333;
		padding-top: 1.6rem;
		font-family: Arial, 'Times New Roman', 'Microsoft YaHei', SimHei;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	img {
		display: inline-block;
		max-width: 100%;
	}
	/*场景切换*/

	.wrap {
		position: relative;
		height: 100%;
	}

	.full-h {
		min-height: calc(100vh - 50px);
		background: #ebebeb;
	}

	.next-enter {
		z-index: 1002;
		-webkit-animation: pageFromRightToCenter 500ms forwards;
		animation: pageFromRightToCenter 500ms forwards
	}

	.next-leave {
		z-index: 1001;
		-webkit-animation: pageFromCenterToLeft 500ms forwards;
		animation: pageFromCenterToLeft 500ms forwards
	}

	.prev-enter {
		z-index: 1001;
		-webkit-animation: pageFromLeftToCenter 500ms forwards;
		animation: pageFromLeftToCenter 500ms forwards
	}

	.prev-leave {
		z-index: 1002;
		-webkit-animation: pageFromCenterToRight 500ms forwards;
		animation: pageFromCenterToRight 500ms forwards;
	}

	@-webkit-keyframes pageFromRightToCenter {
		from {
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
			opacity: .9;
		}
		to {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
			opacity: 1;
		}
	}

	@keyframes pageFromRightToCenter {
		from {
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
			opacity: .9;
		}
		to {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
			opacity: 1;
		}
	}

	@-webkit-keyframes pageFromCenterToRight {
		from {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
			opacity: 1;
		}
		to {
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
			opacity: .9;
		}
	}

	@keyframes pageFromCenterToRight {
		from {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
			opacity: 1;
		}
		to {
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
			opacity: .9;
		}
	}

	.page-from-center-to-left {
		-webkit-animation: pageFromCenterToLeft 500ms forwards;
		animation: pageFromCenterToLeft 500ms forwards;
	}

	.page-from-left-to-center {
		-webkit-animation: pageFromLeftToCenter 500ms forwards;
		animation: pageFromLeftToCenter 500ms forwards;
	}

	@-webkit-keyframes pageFromCenterToLeft {
		from {
			opacity: 1;
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
		to {
			opacity: 0.5;
			-webkit-transform: translate3d(-20%, 0, 0);
			transform: translate3d(-20%, 0, 0);
		}
	}

	@keyframes pageFromCenterToLeft {
		from {
			opacity: 1;
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
		to {
			opacity: 0.5;
			-webkit-transform: translate3d(-20%, 0, 0);
			transform: translate3d(-20%, 0, 0);
		}
	}

	@-webkit-keyframes pageFromLeftToCenter {
		from {
			opacity: .5;
			-webkit-transform: translate3d(-20%, 0, 0);
			transform: translate3d(-20%, 0, 0);
		}
		to {
			opacity: 1;
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
	}

	@keyframes pageFromLeftToCenter {
		from {
			opacity: .5;
			-webkit-transform: translate3d(-20%, 0, 0);
			transform: translate3d(-20%, 0, 0);
		}
		to {
			opacity: 1;
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all .3s ease;
	}
	/*.fade-enter,*/
	
	.fade-leave-active {
		opacity: 0;
		transform: translateX(100%);
	}
	
	.fade-enter {
		opacity: 0;
		transform: translateX(-100%);
	}
</style>