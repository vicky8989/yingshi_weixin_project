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