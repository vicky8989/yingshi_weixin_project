<template>
	<div id="index">
		<Slider :list="pics" />
		<div class="top">
			<ul class="statistics">
				<li>
					<i class="iconfont icon-ren"></i>已报名
					<span>{{userData.id}}</span>
				</li>
				<li>
					<i class="iconfont icon-piao"></i>累计投票
					<span>{{userData.voteNum}}</span>
				</li>
				<li>
					<i class="iconfont icon-redu"></i>访问量
					<span>{{userData.hot}}</span>
				</li>
			</ul>
			<conutDown time="2017/12/2 20:10:10" />
			<div class="enrol">
				<a href="javascript:;" class="enrol_btn">我要报名</a>
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
			<div class="aui-card-list-footer aui-text-center more" @click="handleMore">
				加载更多
			</div>
			<!--<div class="load_more" @click="handleMore">加载更多</div>-->
		</div>

		<div class="activity_rules">
			<div class="rules_title"><i class="iconfont icon_font">&#xe685;</i>活动规则</div>
			<div class="content">
				<strong>所有获奖作品汇编《世纪华人书画精品传世典藏》一书。对于传播中华文化，推动艺术交流鉴赏以及提升艺术家的知名度都是极具重大意义和收藏价值。（所有获奖作品选手 ，人均可获得一本）。</strong>
				<p>大赛奖品丰厚，设有特等奖，一，二，三等奖，优秀奖。前50名都有大赛奖杯，大赛荣誉证书，大赛奖牌，大赛荣誉牌匾，这些奖品不仅仅是物质上的奖励，更是对您取得的艺术成就的肯定，所以具有非常重要的收藏意义！前50名以后的参赛者只要满500票，同时满150点礼物积分，也会颁发大赛荣誉证书，大赛荣誉牌匾，豪华精装笔墨纸砚套装礼盒，紫砂纪念杯。欢迎广大书画艺术爱好者踊跃报名参赛！</p>
				<img src="./../assets/images/IMG_0117.png" />
				<h1>2017世界华人书画大赛</h1>
				<h4>主办方：世界华人书画大赛网</h4>
				<h5>协办方：书画美术艺术竞赛平台官网</h5>
				<span>大赛客服老师微信号：shuhuadasaiwang</span>
			</div>
		</div>
		<BottomNav/>
	</div>
</template>

<script>
	import Slider from './common/Slider.vue'
	import conutDown from './common/conutDown.vue'
	 import BottomNav from './common/BottomNav.vue'
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
				pics: testData,
				searchInfo: '',
				listData: testData,
				playerList: {
					totalCount: '', //总条数
					pageNum: 1,
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
			}
		},
		created() {},
		components: {
			Slider,
			conutDown,
			BottomNav
		},
		methods: {
			//获取列表
			getListData() {
				let self = this;
				let param = {
//					pageNumber: self.playerList.pageNumber,
//					pageSize: self.playerList.pageSize
				};
				this.appendLi();

								this.ApiSever.getListData(param).then(res => {
									console.log(res)
//									let result = res.data;
//									if(result.success) {
//										self.playerList.value = result.value;
//										self.playerList.totalCount = result.count;
//										self.isHaveMore();
//										self.appendLi();
//								   }
								});
			},

			//是否可以点击加载更多事件
			isHaveMore() {
				this.allLoaded = false;
				let currentNum = parseInt(this.playerList.pageSize);
				if(currentNum == this.playerList.totalCount || currentNum > this.playerList.totalCount) {
					this.allLoaded = true;
				}
			},

			//点击加载更多
			handleMore() {
				alert('加载更多')
				if(this.allLoaded) return false;

				if((this.playerList.totalCount) / (this.playerList.pageSize) <= 1) {
					this.playerList.pageNumber = 1;
					this.allLoaded = true;
				} else {
					this.playerList.pageSize = parseInt(this.playerList.pageSize) + 10;
					this.allLoaded = false;
				}
				this.getListData();
			},

			//点击搜索按钮事件
			handleSearch() {
				if(!this.searchInfo) {
					alert('请输入搜索内容');
				}
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
				oSpan.innerHTML = data.id + '号, ' + data.num + '票';
				oP.innerHTML = data.name;
				var oImg = new Image();
				oImg.src = data.src + '?t=' + Math.random();

				if(!oImg.width || !oImg.height) {
					var img = new Image();
					img.src = data.src;
					oImg = img;
				}

				//点击跳转到投票界面
				oDiv.onclick = function() {
					console.log('给' + data.id + '投票');
					this_.$router.push({
						path: '/votes/' + data.id,
						params: {
							id: data
						}
					});
				}
				oLi.appendChild(oImg);
				oLi.appendChild(oSpan);
				oLi.appendChild(oP);
				oLi.appendChild(oDiv);

				return oLi;
			},

			//通过排序实现瀑布流效果
			appendLi() {

				let oAaterfallFlow = document.getElementById('waterfallFlow');
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

			}
		},

		mounted() {
			this.getListData();
		}
	}
</script>

<style type="text/css" scoped>

</style>