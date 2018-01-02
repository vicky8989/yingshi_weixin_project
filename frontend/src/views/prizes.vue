<template>
	<div id="prizes">
		<div class="prizes_list" v-for="(list,index) in prizesList.value">
			<h5>{{list.name}}: {{list.prizeinfo}} {{list.num}}名</h5>
			<div class="prizes_detail">
				<img :src="imgURL+list.prizeimg"/>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				imgURL: this.ApiSever.imgUrl,
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
		},
		methods: {
			getPrizesList(aid) {
				if(!aid) {
					this_.$router.push({path:'/index'});
				}
				this.ApiSever.getPrizes(aid).then(res => {
					let result = res.data;
					if(result) {
						this.prizesList.value = result;
					}
				})
			}
		},
		mounted() {
			this.getPrizesList(this.ApiSever.AID);
		}
	}
</script>

<style type="text/css" scoped>

</style>