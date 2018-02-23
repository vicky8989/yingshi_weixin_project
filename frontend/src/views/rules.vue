<template>
	<div id="a-rules">
		<div class="rules_title"><i class="iconfont icon_font">&#xe649;</i>参赛规则</div>
			<div class="content">
				<h1>{{activity.name}}</h1>
				<h5>协办方：{{activity.sponsor}}</h5>
				<span>大赛客服老师微信号：{{activity.contact}}</span>
			</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				activity: this.$store.state.actitiyInfo || {}
			}
		},
		created() {},
		components: {
		},
		methods: {
			
		},
		mounted() {
			
		}
	}
</script>

<style type="text/css" scoped>
	#a-rules{
		margin-top: 1rem;
	}
</style>