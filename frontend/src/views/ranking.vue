<template>
	<div id="ranking">
		<conutDown :time="endTime" />
		<mt-navbar v-model="currentSelected">
			<mt-tab-item id="votes" @click.native="sortUsers(1)">票数榜</mt-tab-item>
			<mt-tab-item id="gift" @click.native="sortUsers(2)">礼物榜</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="currentSelected">
			<mt-tab-container-item id="votes">
				<ul class="ranking_list" v-for="(list, index) in listData.value">
					<router-link :to="{path:'votes',query:{id:list.id}}" :key="list.id">
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
				<router-link :to="{path:'votes',query:{id:list.id}}" :key="list.id">
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

		<BottomNav></BottomNav>
	</div>
</template>

<script>
	import { Navbar, TabItem } from 'mint-ui';
	import conutDown from './common/conutDown.vue';
	import BottomNav from './common/BottomNav.vue';

	export default {
		data() {
			return {
				endTime: '2017/12/4 20:10:10',
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
			conutDown,
			BottomNav
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
			}
		},
		mounted() {
			this.getListData();
		}
	}
</script>

<style type="text/css" scoped>

</style>