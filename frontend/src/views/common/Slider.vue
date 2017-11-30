<template>
	<div>
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="(item,index) in list" key="index">
				<div class="bg_cover" :style="{backgroundImage: 'url('+item.src+')'}">
					<img :src="item.src">
				</div>
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script>
	export default {
		name: "Slider",
		data() {
			return {
				msg: 'hello vue',
			}
		},
		props: {
			list: {
				type: Array,
				required: false
			},
		},
		watch: {
			list: function(val) {
				this.renderSlider()
			}
		},
		methods: {},
		mounted() {}

	}
</script>
<style type="text/css" scoped>
	.bg_cover {
		width: 100%;
		height: 300px;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50%;
	}
	
	.bg_cover img {
		opacity: 0;
	}
	
	.mint-swipe {
		height: 300px;
	}
</style>