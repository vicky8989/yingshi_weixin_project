<template>
	<div id="prizes">
		<div class="prizes_list" v-for="(list,index) in prizesList.value">
			<h5>{{list.name}} {{list.number}}</h5>
			<div class="prizes_detail" v-for="(detail,item) in list.details">
				<label for="">{{detail.name}}:</label>
				<span>{{detail.subname}}</span>
			</div>
		</div>
		<BottomNav></BottomNav>
	</div>
</template>

<script>
	import BottomNav from './common/BottomNav.vue'
	import Mock from 'mockjs'

	// 生成商品列数据
	Mock.mock('awards.json', {
		code: 1,
		msg: '查询成功',
		data: {
			'total': 20,
			'records': 10,
			'page': 1,
			'rows|3': [{
				'id|+1': 1,
				'name': '@cword(3, 20)',
				"number": '@natural(1, 100)',
				'details|1-10': [{
					"name": "@cword(3, 4)",
					"subname": "@cword(6, 10)"
				}]
			}]
		}
	});

	export default {
		data() {
			return {
				prizesList: {
					totalCount: 0, // 总条数
					pageNumber: 1, // 当前显示页号
					pageSize: 10, // 每页显示数据条数
					value: [], // 显示数据
				}
			}
		},
		created() {},
		components: {
			BottomNav
		},
		methods: {
			getListData() {
				this.ApiSever.getPrizes(null).then(res => {
					let result = res.data;
					if(result.code == 1) {
						this.prizesList.value = result.data.rows;
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