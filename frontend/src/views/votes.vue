<template>
	<div id="vote">
		<div class="user_poho">
			<img :src="userData.img" />
			<div class="user_name">{{userData.name}}</div>
		</div>
		<ul class="user_vote">
			<li>
				<i class="iconfont icon-ren"></i>编号
				<p>{{userData.id}}</p>
			</li>
			<li>
				<i class="iconfont icon-piao"></i>票数
				<p>{{userData.voteNum}}</p>
			</li>
			<li>
				<i class="iconfont icon-redu"></i>热度
				<p>{{userData.hot}}</p>
			</li>
			<li>
				<i class="iconfont icon-liwu"></i>礼物
				<p>{{userData.gifts.length}}点</p>
			</li>
		</ul>
		<div class="declaration"><i class="iconfont icon_font">&#xe6bf;</i>宣言：{{userData.words}}</div>
		<Slider :list="userData.pics" />
		<div class="enrol">
			<a href="javascript:;" class="enrol_btn" @click="handleSignin">我也要参加</a>
		</div>
		<div class="rules_title"><i class="iconfont icon_font">&#xe62f;</i>礼物列表</div>
		<div class="giftlist">
			<div class="content">
				<div class="gift_msg">
					<ul v-for="(item, index) in userData.gifts">
						<li>
							<div class="img_box">
								<img :src="item.img" />
							</div>
							<div class="text_div">
								<span>{{item.name}}，送Ta一份{{item.text}}</span>
								<span>{{item.time}}</span>
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
	import Slider from './common/Slider.vue'

	let testData = [{
		id: 3,
		num: 200,
		name: '吉祥象',
		src: 'http://www.artrondata.com/hml/view/93、苍空独立图.jpg'
	}, {
		id: 4,
		num: 200,
		name: '装饰画公鸡',
		src: 'http://www.artrondata.com/hml/view/59%E3%80%81%E8%A3%85%E9%A5%B0%E7%94%BB%E5%85%AC%E9%B8%A1.jpg'
	}, {
		id: 6,
		num: 200,
		name: '布艺厅',
		src: 'http://www.artrondata.com/hml/view/11、母与子-1.jpg'
	}, {
		id: 7,
		num: 200,
		name: '布艺厅',
		src: 'http://www.artrondata.com/hml/view/23、卡纸岩画.jpg'
	}, {
		id: 9,
		num: 200,
		name: '母与子',
		src: 'http://www.artrondata.com/hml/view/11、母与子-2.JPG'
	}];

	export default {
		data() {
			return {
				//pics: testData,
				userId: this.$route.params.id,
				userData: {
					voteNum: 12,
					hot: 12,
					name:'',
					img:'',
					gift: 12,
					id: 12,
					pics:[{
						id: 1,
						src: 'http://www.artrondata.com/hml/view/93、苍空独立图.jpg'
					}],
					gifts:[]
				},

			}
		},
		created() {},
		components: {
			Slider
		},
		methods: {
			//通过id获取本个人的信息
			getUserInfo() {
				let param = {
					id: this.$route.params.id
				};

				let self = this;

				this.ApiSever.getUserDataByID(param).then(res => {
					console.log(res);
					let result = res.body.data;
					self.userData = result;
				});

			},

			//跳转到某个具体的界面
			handleJump() {
				this.$router.push({
					path: '/index'
				});
			},

			handletoGift() {
				this.$router.push({
					path: '/gift/' + this.userId,
					params: {
						id: this.userId
					}
				});
			},

			//投票按钮点击事件
			handleVotes() {
				console.log('当前的选手id', this.userId);
				let param = {
					id: this.$route.params.id
				};
				//				this.$toast.loading({
				//					title: "投票中",
				//					html: '<i class="aui-iconfont aui-icon-laud"></i>',
				//					duration: 2000 //猜的，还没测试
				//				});
				//				this.ApiSever.getListData(param).then(res => {
				//					toast.hide();
				//					let result = res.data;
				//				});

			},

			//我要报名点击事件
			handleSignin() {
				this.$router.push({
					path: '/signin'
				});
			}
		},

		mounted() {
			this.getUserInfo();
		}
	}
</script>

<style type="text/css" scoped>

</style>