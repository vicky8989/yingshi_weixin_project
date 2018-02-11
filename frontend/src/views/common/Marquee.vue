<template>
	<marquee class="notice" direction="left" align="middle"  v-if="actitiyInfo&&actitiyInfo.voteend"> <i class="iconfont">&#xe6bf;  投票时间截至到{{actitiyInfo.voteend | timeMoment}}日</i> </marquee>
</template>
<script>
	export default {
		data() {
			return {}
		},

		computed: {
			actitiyInfo() {
				return this.$store.state.actitiyInfo;
			},
		}
	}
</script>