<template>
	<div id="gift">
		<div class="div_info" @click="gotoUserpage">
			<div class="div_img">
				<img src="./../assets/images/IMG_0117.png" />
			</div>
			<div class="div_msg">
				<div class="div_name">{{userData.name}}</div>
				<span>给他送一份礼物吧</span>
			</div>
			<i class="iconfont">&#xe686;</i>
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
		<ul class="gift_list">
			<li v-for="(list, index) in giftList" key="index" @click="handleCheckgift(list._id)">
				<div class="div_box" :class="{'active':list._id==currentId}">
					<div class="div_img">
						<img src="./../assets/images/gift.jpg" />
					</div>
					<p>{{list.name}}</p>
					<span>{{list.num}}</span>
				</div>
			</li>
			
		</ul>
		<div class="div_select">
			<div class="div_label">请选择以上礼物</div>

			<div class="list_selectinput">
				<select>
					<option  v-for="n in 100" value="n">{{n}}</option>
				</select>
			</div>

		</div>
		<div class="purchasing">
			<a href="javascript:;" class="purchasing_btn" @click="purchase">立刻购买</a>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				giftList: [],
				currentId: null,
				userId:this.$route.params.id,
				userData: {
					voteNum: 12,
					hot: 12,
					giftnum: 12,
					code: 12
				}
			}
		},
		created() {},
		components: {
		},
		methods: {
			//通过id获取本个人的信息			
			getUserInfo() {
				console.log(this.$route.query)
				let sid = this.$route.params.id;

				let self = this;

				this.ApiSever.getUserDataByID(sid).then(res => {
					console.log(res);
					let result = res.body;
					self.userData = result[0];
					//请求用户信息
					self.ApiSever.getPresentsTotal(sid).then(giftNum => {
						let num = giftNum.body&& giftNum.body.length>0?giftNum.body[0].value:0;						
						self.userData.giftnum = num;
						self.$forceUpdate();
					});
				});
			},

			getGiftsList() {
				let self = this;
				this.ApiSever.getGiftsList().then(res => {
					console.log(res);
					self.giftList = res.body;
				});

			},

			//选择礼物
			handleCheckgift(id) {
				if(this.currentId == id) {
					this.currentId = null;
					return false;
				}
				this.currentId = id;
			},

			//跳转到某个具体的界面
			handleJump() {
				this.$router.push({
					path: '/index'
				});
			},
			
			gotoUserpage(){
				this.$router.push({
					path: '/votes/'+this.userId,
					params: {
						id: this.userId
					}
				});
			},

			//购买礼物
			purchase() {
				let data=self.userData;
				data.num = 
				{
						"sid": "5a4a15b9df064b1504f7af90",
					    "openid": "0xadcbf2324460caddeff",
					    "nickname": "海问香",
					    "headimgurl": "海问香的头像URL",
					    "num": 1,
					    "gid": "753e24b91fdd04110cd981ac",
					    "giftName": "游艇",
					    "time": "2017-12-17T07:06:11.475Z"
				}
			}
		},

		mounted() {
			if(!this.$route.params.id) this.handleJump();
			this.getUserInfo();
			this.getGiftsList();
		}
	}
</script>

<style type="text/css" scoped>

</style>