<template>
	<div id="ranking">
		<conutDown :time="endTime" @validCurTime="validCurTime"/>
		<mt-navbar v-model="currentSelected">
			<mt-tab-item id="votes" @click.native="sortUsers(1)">票数榜</mt-tab-item>
			<mt-tab-item id="gift" @click.native="sortUsers(2)">礼物榜</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="currentSelected">
			<mt-tab-container-item id="votes">
				<ul class="ranking_list" v-for="(list, index) in listData.value">
					<router-link :to="{path:'votes',query:{id:list.id,isFinished:isVoteFinished}}" :key="list.id">
					<li  key="index">
						<div class="ranking_lf">
							<div class="crown" v-if="index<3"></div>
							<div class="poho">
								<img :src="list.pic" />
							</div>
						</div>
						<div class="ranking_center">
							<h5>{{list.name}}  {{list.number}}号</h5>
							<span><label for="">票数:</label>{{list.voteNum}}<label for="">礼物:</label>{{list.present}}点</span>
							<span>{{list.title}}</span>
						</div>
						<div class="ranking_rg" :class="{'ok':index<3}">
							{{index+1}}
						</div>
					</li>
				</router-link>
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="gift">
				<ul class="ranking_list" v-for="(list, index) in listData.value" >
				<router-link :to="{path:'votes',query:{id:list.id,isFinished:isVoteFinished}}" :key="list.id" >
					<li key="index">
						<div class="ranking_lf">
							<div class="crown" v-if="index<3"></div>
							<div class="poho">
								<img :src="list.pic" />
							</div>
						</div>
						<div class="ranking_center">
							<h5>{{list.name}}  {{list.number}}号</h5>
							<span><label for="">礼物:</label>{{list.present}}点<label for="">票数:</label>{{list.voteNum}}</span>
							<span>{{list.title}}</span>
						</div>
						<div class="ranking_rg" :class="{'ok':index<3}">
							{{index+1}}
						</div>

					</li></router-link>
				</ul>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	import { Navbar, TabItem, Indicator,
		Toast} from 'mint-ui';
	import conutDown from './common/conutDown.vue';

	export default {
		data() {
			return {
				endTime: this.ApiSever.FINSIHTIME,
				isVoteFinished:this.ApiSever.getFinishTime(),
				listData: {
					totalCount: 0, // 总条数
					pageNumber: 1, // 当前显示页号
					pageSize: 10, // 每页显示数据条数
					value: [], // 显示数据
				},
				currentSelected: 'votes'
			}
		},
		created() {},
		components: {
			conutDown
		},
		methods: {
			getListData() {
				let self = this;
				this.ApiSever.getRanking(null).then(res => {
					let result = res.body.data;
					console.log('result.data.rows', result.rows);
					self.listData.value = result.rows;
				})
			},
			//根据投票数或礼物数排序
			sortUsers(type) {
				let self = this;
				if(type == 1) {
					self.listData.value.sort((a,b)=>{
		              return a.voteNum < b.voteNum;
		            })
				} else {
					self.listData.value.sort((a,b)=>{
		              return a.present < b.present;
		            })
				}
			},
			validCurTime(curtime) {
					console.log('aa', curtime)
					if(curtime <= 0) {
						Toast({
							message: '活动已结束',
							position: 'middle',
							duration: 5000
						});
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