<template>
	<div id="index">
		<Slider :list="pics" />
		<div class="top">
			<ul class="statistics">
				<li>
					<i class="iconfont">&#xe648;</i>已报名
					<span>{{userData.total}}</span>
				</li>
				<li>
					<i class="iconfont">&#xe659;</i>累计投票
					<span>{{userData.voteNum}}</span>
				</li>
				<li>
					<i class="iconfont">&#xe619;</i>访问量
					<span>{{activity.pv}}</span>
				</li>
			</ul>
			<conutDown :time="finishTime"/>
			<!--<conutDown :time="finishTime" @validCurTime="validCurTime" />-->
			<div class="enrol">
				<a href="javascript:;" class="enrol_btn" @click="handleSignin" :class="{'div_end':!isEnroltime}">我要报名</a>
			</div>
		</div>

		<div class="content">
			<div class="search_box">
				<input type="text" class="search_input" placeholder="请输入搜索内容" v-model="searchInfo"></input>
				<a href="javascript:;" class="a_href" @click="handleSearch">搜索</a>
			</div>
			<div class="waterfall-flow" id="waterfallFlow">
				<ul>
				</ul>
				<ul>
				</ul>
			</div>

			<template v-if="allLoaded === false">
				<div class="load_more" @click="handleMore">加载更多</div>
			</template>
		</div>
		<div class="activity_rules">
			<div class="rules_title"><i class="iconfont icon_font">&#xe64d;</i>活动介绍</div>
			<div class="content">
				<strong>{{activity.rule}}</strong>
			</div>
			<div class="rules_title"><i class="iconfont icon_font">&#xe674;</i>奖品介绍</div>
			<div class="content">
				<p>{{activity.info}}</p>
				<img :src="imgURL+activity.infoimg" />
			</div>
			<!-- <div class="rules_title"><i class="iconfont icon_font">&#xe649;</i>参赛规则</div>
			<div class="content">
				<h1>{{activity.name}}</h1>
				<h5>协办方：{{activity.sponsor}}</h5>
				<span>大赛客服老师微信号：{{activity.contact}}</span>
			</div> -->
		</div>
	</div>
</template>

<script>
	import {
		Indicator,
		Toast,
		MessageBox
	} from 'mint-ui'
	import Slider from './common/Slider.vue'
	import conutDown from './common/conutDown.vue'

	export default {
		data() {
			return {
				pics: [],
				activity: {},
				searchInfo: '',
				perPageNum: this.ApiSever.PERPAGENUM,
				curPage: 0,
				originData: [],
				listData: [],
				finishTime: this.ApiSever.FINSIHTIME,
				isVoteFinished: this.ApiSever.getFinishTime(),
				playerList: {
					totalCount: 0, //总条数
					pageSize: 10,
					value: []
				},
				allLoaded: false, //是否可以加载更多，false可以，true为禁止
				userData: {
					voteNum: 12,
					hot: 12,
					gift: 12,
					id: 12
				},
				imgURL: this.ApiSever.imgUrl
			}
		},
		watch: {
			finishTime: function(newQuestion) {
				this.finishTime = newQuestion;
			}
		},
		computed: {
			//是否可以报名
			isEnroltime() {
				return this.$store.state.isEnroltime;
			},
			//是否在投票范围
			isVotetime() {
				return this.$store.state.isVotetime;
			},
		},
		components: {
			Slider,
			conutDown
		},
		methods: {
			getActivity() {
				let self = this;
				this.ApiSever.getActivity().then(res => {
					if(res && res.data && res.data.length > 0) {
						let result = res.data[0];
						self.activity = result;
						self.pics = result.banner;
						//						self.ApiSever.FINSIHTIME = result.voteend;
						self.ApiSever.AID = result._id;
						self.getListData(result._id);
						self.$emit('finishTimeChanged', result.voteend);
						self.finishTime =result.voteend;
						self.$store.dispatch('setActivityInfo',result);
						self.$forceUpdate();
					}
				});
			},
			//获取列表
			getListData(aid) {
				//Indicator.open('加载中...');
				let self = this;
				// let param = {
				// 	pageNumber: self.playerList.pageNumber,
				// 	pageSize: self.playerList.pageSize
				// };
				this.appendLi();
				if(!aid) return;
				this.ApiSever.getListSigners(aid).then(res => {
					Indicator.close();
					//console.log(res)
					let result = res.body;
					if(result && result.length > 0) {
						self.playerList.value = result;
						self.playerList.totalCount = result.length;
						self.userData.total = result.length;
						self.userData.votenum = 0;
						result.map((item) => {
							self.userData.votenum += item.votenum;
						})
						self.playerList.pageSize = Math.ceil(self.playerList.totalCount / self.perPageNum);
						self.getPageData();
						self.isHaveMore();
						self.appendLi();
						self.$forceUpdate();
					}
				});
			},

			getPageData() {
				let start = 0,
					end = this.curPage * this.perPageNum + this.perPageNum;
				if(end > this.playerList.totalCount) end = this.playerList.totalCount;

				this.listData = this.playerList.value.slice(start, end);
				//console.log('page data',this.listData);
			},

			//是否可以点击加载更多事件
			isHaveMore() {
				this.allLoaded = false;
				let currentNum = (this.curPage + 1) * this.perPageNum;
				if(currentNum == this.playerList.totalCount || currentNum > this.playerList.totalCount) {
					this.allLoaded = true;
				} else this.allLoaded = false;
			},

			//点击加载更多
			handleMore() {
				this.curPage++;
				this.getPageData();
				this.isHaveMore();
				this.appendLi();
			},

			//点击搜索按钮事件
			handleSearch() {
				if(this.searchInfo != '') {
					let data = [],
						searchTxt = this.searchInfo;
					this.listData = [];
					for(var i = 0, ilen = this.playerList.value.length; i < ilen; i++) {
						let item = this.playerList.value[i];
						if(item.code.toString().indexOf(searchTxt) >= 0 || item.name.indexOf(searchTxt) >= 0) {
							this.listData.push(item);
						}
					}

				} else {
					this.getPageData();
				}
				this.appendLi();
				this.isHaveMore();
			},

			//创建Li
			createLi(data) {
				let this_ = this;
				var oLi = document.createElement('li');
				var oSpan = document.createElement('span');
				var oP = document.createElement('p');
				var oDiv = document.createElement('div');
				oDiv.className = 'vote_btn';
				oDiv.innerHTML = '投票';
				oSpan.className = 'votes';
				oSpan.innerHTML = data.code + '号, ' + data.votenum + '票';
				oP.innerHTML = data.name;
				var oImg = new Image();
				oImg.src = this_.imgURL + data.pics[0];

				//点击跳转到投票界面
				oDiv.onclick = function() {
					this_.$store.commit('voteTime');
					if(!this_.isVotetime) return false;
					this_.$router.push({
						path: '/votes/' + data._id + '/' + data.openid,
						params: {
							id: data,
							openid: data.openid
						},
						query: {
							isFinished: this_.isVoteFinished
						}
					});
				}

				oImg.onclick = function() {
					this_.$store.commit('voteTime');
					if(!this_.isVotetime) return false;
					this_.$router.push({
						path: '/votes/' + data._id + '/' + data.openid,
						params: {
							id: data,
							openid: data.openid
						},
						query: {
							isFinished: this_.isVoteFinished
						}
					});
				}
				
				oLi.appendChild(oImg);
				oLi.appendChild(oSpan);
				oLi.appendChild(oP);
				//oLi.appendChild(oDiv);

				return oLi;
			},

			//通过排序实现瀑布流效果
			appendLi() {
				let oAaterfallFlow = document.getElementById('waterfallFlow');
				if(!oAaterfallFlow) return false;

				let aUl = oAaterfallFlow.getElementsByTagName('ul');

				aUl[0].innerHTML = '';
				aUl[1].innerHTML = '';

				let resultData = this.listData;
				if(!resultData || resultData.length < 1) return false;

				for(var i = 0, ilen = resultData.length; i < ilen; i++) {
					var oLi = this.createLi(resultData[i]);
					var arr = [];
					for(var j = 0, len = aUl.length; j < len; j++) {
						arr.push(aUl[j]);
					}

					arr.sort(function(u1, u2) {
						return u1.scrollHeight - u2.scrollHeight;
					});
					arr[0].appendChild(oLi);
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
			validCurTime(curtime) {
				if(curtime <= 0) {
					Toast({
						message: '活动已结束',
						position: 'middle',
						duration: 5000
					});
				}
			}
		},
		created() {
			//第一次创建的时候存入openid
			var userId = this.$utils.getUrlKey("openid");
			if(!this.$store.state.wxUser.openid && userId) {
				this.$store.dispatch('setWeixinUserInfo', {
					openid: userId
				});
			}
			this.getActivity();
		},
		destroyed() {
			Indicator.close();
		}
	}
</script>

<style type="text/css" scoped>

</style>