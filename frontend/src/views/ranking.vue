<template>
	<div id="ranking">
		<conutDown />
		<mt-navbar v-model="currentSelected">
			<mt-tab-item id="votes" @click.native="sortUsers(1)">票数榜</mt-tab-item>
			<mt-tab-item id="gift" @click.native="sortUsers(2)">礼物榜</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="currentSelected">
			<mt-tab-container-item id="votes">
				<ul class="ranking_list" v-for="(list, index) in listData">
					<router-link :to="{path:'votes/'+list._id+'/'+list.openid}" :key="list._id">
						<li key="index">
							<div class="ranking_lf">
								<div class="crown" v-if="index<3"></div>
								<div class="poho">
									<img :src="list.headimgurl" />
								</div>
							</div>
							<div class="ranking_center">
								<h5>{{list.name}}  {{list.code}}号</h5>
								<span><label for="">票数:</label>{{list.votenum}}<label for="">礼物:</label>{{list.present}}点</span>
								<span>{{list.words}}</span>
							</div>
							<div class="ranking_rg" :class="{'ok':index<3}">
								{{index+1}}
							</div>
						</li>
					</router-link>
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="gift">
				<ul class="ranking_list" v-for="(list, index) in listData">
					<router-link :to="{path:'votes/'+list._id+'/'+list.openid,params:{id: list._id,openid:list.openid}}" :key="list._id">
						<li key="index">
							<div class="ranking_lf">
								<div class="crown" v-if="index<3"></div>
								<div class="poho">
									<img :src="list.headimgurl" />
								</div>
							</div>
							<div class="ranking_center">
								<h5>{{list.name}}  {{list.code}}号</h5>
								<span><label for="">礼物:</label>{{list.present}}点<label for="">票数:</label>{{list.votenum}}</span>
								<span>{{list.words}}</span>
							</div>
							<div class="ranking_rg" :class="{'ok':index<3}">
								{{index+1}}
							</div>

						</li>
					</router-link>
				</ul>
			</mt-tab-container-item>
		</mt-tab-container>

		<BottomNav></BottomNav>
	</div>
</template>

<script>
	import {
		Navbar,
		TabItem,
		Indicator,
		Toast
	} from 'mint-ui';
	import conutDown from './common/conutDown.vue';
	import BottomNav from './common/BottomNav.vue';

	export default {
		data() {
			return {
				imgURL: this.ApiSever.imgUrl,
				listData: [],
				currentSelected: 'votes'
			}
		},
		components: {
			conutDown,
			BottomNav
		},
		methods: {
			getListData(aid) {
				let self = this;
				this.ApiSever.getListSigners(aid).then(res => {
					let result = res.body;
					console.log('result.data.rows', result);
					self.listData = result;
					let userIndex = 0,
						presentIndex = 0;
					for(var i = 0, ilen = result.length; i < ilen; i++) {
						self.listData[i].present = 0;
						self.listData[i].headimgurl = '';

						//请求用户信息
						self.ApiSever.getUserInfo(result[i].openid).then(info => {
							let userInfo = info.data;
							if(userInfo.length > 0) {
								self.listData[userIndex].headimgurl = userInfo[0].headimgurl;
							}

							userIndex++;
							console.log('user i', userInfo, userIndex, self.listData[userIndex]);
							if(userIndex == ilen) self.$forceUpdate();
						});

						//请求礼物信息
						self.ApiSever.getPresentsTotal(result[i]._id).then(giftNum => {
							let num = giftNum.body && giftNum.body.length > 0 ? giftNum.body[0].value : 0;

							self.listData[presentIndex].present = parseInt(num);
							presentIndex++;
							if(presentIndex == ilen) self.$forceUpdate();
						});
					}
				})
			},
			//根据投票数或礼物数排序
			sortUsers(type) {
				let self = this;
				if(type == 1) {
					self.listData.sort((a, b) => {
						return a.votenum < b.votenum;
					})
				} else {
					self.listData.sort((a, b) => {
						return a.present < b.present;
					})
				}
			}
		},
		created() {
			let aid = this.ApiSever.AID;
			if(!aid) {
				this.$router.push({
					path: '/index'
				});
			}
			this.getListData(aid);
		}
	}
</script>

<style type="text/css" scoped>

</style>