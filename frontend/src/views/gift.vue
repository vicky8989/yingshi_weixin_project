<template>
	<div id="gift">
		<div class="div_info" @click="gotoUserpage">
			<div class="div_img">
				<img src="./../assets/images/IMG_0117.png" />
			</div>
			<div class="div_msg">
				<div class="div_name">测试</div>
				<span>给他送礼物</span>
			</div>
			<i class="iconfont">&#xe686;</i>
		</div>
		<ul class="user_vote">
			<li>
				<i class="iconfont icon-ren"></i>编号{{userData.id}}
			</li>
			<li>
				<i class="iconfont icon-piao"></i>票数{{userData.voteNum}}
			</li>
			<li>
				<i class="iconfont icon-redu"></i>热度{{userData.hot}}
			</li>
		</ul>
		<ul class="gift_list">
			<li v-for="(list, index) in giftList" key="index" @click="handleCheckgift(list.id)">
				<div class="div_box" :class="{'active':list.id==currentId}">
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
			<a href="javascript:;" class="purchasing_btn">立刻购买</a>
		</div>
		<BottomNav></BottomNav>
	</div>
</template>

<script>
	import BottomNav from './common/BottomNav.vue'
	
	let testData = [{
		id: 1,
		num: 1,
		name: '鲜花'
	}, {
		id: 2,
		num: 2,
		name: '钻石'
	}, {
		id: 3,
		num: 3,
		name: '鲜花'
	}, {
		id: 4,
		num: 4,
		name: '钻石'
	}, {
		id: 5,
		num: 5,
		name: '鲜花'
	}, {
		id: 6,
		num: 6,
		name: '钻石'
	}, {
		id: 7,
		num: 7,
		name: '鲜花'
	}, {
		id: 8,
		num: 8,
		name: '钻石'
	}];

	export default {
		data() {
			return {
				giftList: [],
				currentId: null,
				userId:this.$route.params.id,
				userData: {
					voteNum: 12,
					hot: 12,
					gift: 12,
					id: 12
				}
			}
		},
		created() {},
		components: {
			BottomNav
		},
		methods: {
			getGiftsList() {
				let param = {
					id: this.userId
				};

				let self = this;
				this.ApiSever.getGiftsList(param).then(res => {
					console.log(res);
					self.giftList = res.body.data.value;
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
			}
		},

		mounted() {
			//console.log('idid',this.$route.params.id);
			this.getGiftsList();
		}
	}
</script>

<style type="text/css" scoped>

</style>