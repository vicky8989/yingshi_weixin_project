<template>
	<div id="vote">
		<div class="user_poho">
			<img :src="userData.headimgurl" />
			<div class="user_name">{{userData.name}}</div>
		</div>
		<ul class="user_vote">
			<li>
				<i class="iconfont icon-ren"></i>编号
				<p>{{userData.code}}</p>
			</li>
			<li>
				<i class="iconfont icon-piao"></i>票数
				<p>{{userData.votenum}}</p>
			</li>
			<li>
				<i class="iconfont icon-redu"></i>热度
				<p>{{userData.hot}}</p>
			</li>
			<li>
				<i class="iconfont icon-liwu"></i>礼物
				<p>{{userData.giftnum}}点</p>
			</li>
		</ul>
		<Slider :list="userData.pics" />

		<!--<div class="declaration" @click="open=!open"><i class="iconfont icon_font">&#xe6bf;</i>内容简述：<span v-if="open==true">收起</span><span v-else>展开</span></div>-->
		<div class="declaration"><i class="iconfont icon_font">&#xe6bf;</i>内容简述：</div>
		<div class="unfurled_describe" :class="{'unfurled_active':isShow}">
			{{userData.words}}
		</div>

		<div  v-if="userData&&userData.words">
			<span class="unfurled" @click="handleShow">{{showInfo}}</span>
		</div>
		<!--<div v-show="open" class="decs-content">
            <slot>{{userData.words}}</slot>
        </div>-->
		<div class="enrol">
			<a href="javascript:;" class="enrol_btn" @click="handleSignin" v-if="isEnroltime">我也要参加</a>
		</div>
		<div class="rules_title"><i class="iconfont icon_font">&#xe62f;</i>礼物列表</div>
		<div class="giftlist">
			<div class="content">
				<div class="gift_msg">
					<ul v-for="(item, index) in userData.gifts">
						<li>
							<div class="img_box">
								<img :src="item.headimgurl" />
							</div>
							<div class="text_div">
								<span>{{item.nickname}}，送Ta一份{{item.giftname}}</span>
								<span>{{getTime(item.time)}}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="vote_footer">
			<div class="vote_btn" @click="handleVotes">
				<div class="interior">
					<i class="iconfont">&#xe600;</i>
				</div>
				<span class="literals">投票</span>
			</div>
			<div class="go_back" @click="handleJump">
				<i class="iconfont">&#xe612;</i> 回首页
			</div>
			<div class="gift_deliver" @click="handletoGift">
				<i class="iconfont">&#xe6ad;</i> 礼物
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui'
	import Slider from './common/Slider.vue'

	export default {
		data() {
			return {
				userId: this.$route.params.id,
				openId: this.$route.params.openid,
				open: false,
				isUserSendGift: false,
				//isFinished:this.ApiSever.getFinishTime(),
				userData: {
					voteNum: 12,
					hot: 12,
					name: '',
					headimgurl: '',
					gift: 12,
					id: 12,
					pics: [{
						id: 1,
						src: 'http://www.artrondata.com/hml/view/93、苍空独立图.jpg'
					}],
					gifts: []
				},
				isShow: false,
				showInfo: '展开',

			}
		},
		created() {},
		components: {
			Slider
		},
		computed: {
			//计算当前时间是否结束
			isFinished() {
				return this.ApiSever.getFinishTime(this.$store.state.conutDown);
			},
			//是否可以报名
			isEnroltime() {
				return this.$store.state.isEnroltime;
			},
			//是否在投票范围
			isVotetime() {
				return this.$store.state.isVotetime;
			},
		},
		methods: {
			//通过id获取本个人的信息
			getUserInfo() {
				console.log(this.openId);
				let openid = this.openId,
					sid = this.userId;
				if(!sid) return;

				let self = this;

				this.ApiSever.getUserDataByID(openid, this.ApiSever.AID).then(res => {
					console.log(res);
					let result = res.body;
					self.userData = result[0];
					if(!self.userData) self.userData = {};
					self.ApiSever.getUserInfo(openid).then(user => {
						console.log('get userinfo', user);
						if(user && user.data && user.data.length > 0) {
							let info = user.data[0];
							self.userData.headimgurl = info.headimgurl;
						}
						self.$forceUpdate();
					});
					//请求用户信息
					self.ApiSever.getPresentsDetail(sid).then(gifts => {
						//debugger;
						let giftsInfo = gifts.body,
							today_ = self.$moment(new Date()).format('YYYY-MM-DD');
						console.log('gifts', giftsInfo);
						self.userData.gifts = giftsInfo;
						self.userData.giftnum = 0;
						giftsInfo.map((item) => {
							//今天是否已经送过礼物
							let time_ = self.$moment(item.time).format("YYYY-MM-DD");
							//alert(time_ == today_);
							if(item.openid == self.$store.state.wxUser.openid && time_ == today_) {
								self.isUserSendGift = true;
							}
							self.userData.giftnum += item.num;
						})
						self.$store.dispatch('setSendGiftStatus', self.isUserSendGift);
						self.$forceUpdate();
					});
					self.addHot(); //增加热度
				});
			},

			//跳转到某个具体的界面
			handleJump() {
				this.$router.push({
					path: '/index'
				});
			},

			handletoGift() {
				let this_ = this;
				//如果今天已经送过礼物了
				//alert(this.$store.state.isSendGiftToday);
				if(this.$store.state.isSendGiftToday == true) {
					this_.$toast({
						message: '您今日已送过礼物了，明日再来！'
					});
					return;
				}

				//用户未授权提示
				if(!this.$store.state.wxUser.openid) {
					this_.$toast({
						message: '用户未授权'
					});
					return;
				}

				this_.$store.commit('voteTime');
				if(!this_.isVotetime) return false;

				this.$router.push({
					path: '/gift',
					query: {
						id: this.$route.params.id,
						openid: this.$route.params.openid
					}
				});
				//				if(this.isFinished) {
				//					Toast({
				//						message: '投票已结束',
				//						position: 'middle',
				//						duration: 5000
				//					});
				//				} else {
				//					let this_ = this;
				//					this.$router.push({
				//						path: '/gift/' + this.$route.params.id + '/' + this.$route.params.openid,
				//						params: {
				//							id: this.$route.params.id,
				//							openid: this.$route.params.openid
				//						}
				//					});
				//				}
			},
			//修改参与者信息
			updateSigner() {
				let this_ = this;
				let row = self.userData;
				row.votenum = !row.votenum ? 0 : parseInt(row.votenum);
				row.votenum += 1;
				this.ApiSever.updateSinger(row._id, row).then(res => {
					Toast({
						message: '投票成功',
						position: 'middle',
						duration: 5000
					});
					console.log('投票成功');
				});
			},
			//投票按钮点击事件
			handleVotes() {
				console.log('当前的选手id', this.userId);
				let self = this;
				//用户未授权提示
				if(!this.$store.state.wxUser.openid) {
					this_.$toast({
						message: '用户未授权'
					});
					return;
				}

				//self.$store.commit('voteTime');
				//if(!self.isVotetime) return false;
				//当前用户是否今日已投票了
				self.ApiSever.getVoter(this.$store.state.wxUser.openid, self.userId).then(res => {
					//今日已经投过票了
					if(res.body.length > 0) {
						self.$toast({
							message: '您今日已投过票了！',
							customClass: 'large-font'
						});
					} else {
						self.addVoter(); //添加今日投票信息
						self.updateSigner(); //更新得票信息
					}
				})
			},

			addVoter() {
				let voter = {
					openid: this.$store.state.wxUser.openid,
					sid: this.userId,
					time: this.$moment(new Date).format('YYYY-MM-DD')
				}
				console.log('votetime', voter.time);
				this.ApiSever.addVoter(voter).then(res => {
					console.log('addVoter', res);
				})
			},
			updateSigner() {
				if(!this.userData.votenum)
					this.userData.votenum = 0;
				this.userData.votenum += 1;
				this.ApiSever.updateSinger(this.userData._id, this.userData).then(res => {
					console.log('updateSigner', res);
				});
			},

			
			//直接新增热度
			addHot() {
				console.log('当前的选手id', this.userId);
				let self = this;
				if(this.isFinished) {
					return;
				} else {
					if(!self.userData.hot)
						self.userData.hot = 0;
					self.userData.hot += 1;
					self.ApiSever.updateSinger(self.userData._id, self.userData).then(res => {

					});
				}
			},

			//我要报名点击事件
			handleSignin() {
				this.$store.commit('conversionTime');
				if(!this.isEnroltime) return false;
				this.$router.push({
					path: '/recruit'
				});
			},

			getTime(time) {
				return this.$moment(time).format('YYYY-MM-DD hh:mm:ss');
			},

			//展开和收起操作
			handleShow() {
				this.isShow = !this.isShow;
				if(this.isShow) {
					this.showInfo = '收起';
				} else {
					this.showInfo = '展开';
					document.body.scrollTop = 0;
				}
			},
		},

		mounted() {
			if(!this.$route.params.id) this.handleJump();
			this.getUserInfo();
		}
	}
</script>

<style type="text/css" scoped>
	.unfurled_describe {
		height: 1.5625rem;
		line-height: 1.5625rem;
		text-align: left;
		font-size: 0.75rem;
		padding: 0 0.6875rem;
		text-indent: 20px;
		display: block;
		overflow: hidden;
	}
	.unfurled_active{
		height: auto;
		line-height: 1.5625rem;
		text-align: left;
		font-size: 0.75rem;
		padding: 0 0.6875rem;
		text-indent: 20px;
		display: block;
		overflow: hidden;
	}
	.unfurled{
		height: 1.5625rem;
		line-height: 1.5625rem;
		text-align: left;
		font-size: 0.75rem;
		/*padding: 0.3875rem 0;*/
		text-align: center;
		display: block;
		overflow: hidden;
		color:#26A2FF;
	}
</style>