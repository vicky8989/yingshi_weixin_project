<template>
	<div id="ranking">
		<conutDown :time="endTime"/>
		<ul class="ranking_list">
			<li v-for="(list, index) in listData.value" key="index">
				<div class="ranking_lf">
					<div class="crown" v-if="index<3"></div>
					<div class="poho">
						<img :src="list.pic" />
					</div>
				</div>
				<div class="ranking_center">
					<h5>{{list.name}}  {{list.number}}号</h5>
					<!--<span><label for="">票数:</label>{{list.voteNum}}<label for="">礼物:</label>{{list.present}}点</span>-->
					<span><label for="">票数:</label>{{list.voteNum}}</span>
					<span>{{list.title}}</span>
				</div>
				<div class="ranking_rg" :class="{'ok':index<3}">
					{{index+1}}
				</div>
			</li>
		</ul>
		<BottomNav></BottomNav>
	</div>
</template>

<script>
	import conutDown from './common/conutDown.vue';
	import BottomNav from './common/BottomNav.vue';
	import Mock from 'mockjs';
let maxPageNum = 5;
// 生成商品列数据
Mock.mock('userList.json', {
        code: 1,
        msg: '查询成功',
        data: {
            'total': 20,
            'records': 10,
            'page': 1,
            'rows|10': [{
                'id|+1': 1,
                'voteNum': '@natural(10, 100)',
                'number': '@natural(1, 100)',
                'name':'@cword(2, 5)',
                'present':'@natural(1, 100)',
                'title': '@ctitle(6,20)',
                'pic': '@image(200x200,#50B347,#fff, nice)'
            }]
        }
});
	export default {
		data() {
			return {
				endTime: '2017/12/2 20:10:10',
				listData: {
					totalCount: 0, // 总条数
					pageNumber: 1, // 当前显示页号
					pageSize: 10, // 每页显示数据条数
					value: [], // 显示数据
				}
			}
		},
		created() {},
		components: {
			conutDown,
			BottomNav
		},
		methods: {
			getListData() {
				this.ApiSever.getRanking(null).then(res => {
					let result = res.data;
					if(result.code == 1) {
						console.log('result.data.rows',result.data.rows);
						this.listData.value = result.data.rows;
					}
				})
			}
		},
		mounted() {
			this.getListData();
		}
	}
</script>

<style type="text/css" scoped>

</style>