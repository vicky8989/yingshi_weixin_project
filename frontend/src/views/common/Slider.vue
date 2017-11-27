<template>
	<div>
		<!--幻灯片 images:750*400-->
		<div id="aui-slide3">
			<div class="aui-slide-wrap">
				<div class="aui-slide-node bg-dark" v-for="(item,index) in list" key="index">
					<div class="bg_cover" :style="{backgroundImage: 'url('+item.src+')'}">
						<img :src="item.src">
					</div>

				</div>
			</div>
			<div class="aui-slide-page-wrap">
				<!--分页容器-->
			</div>
		</div>
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
		methods: {
			renderSlider() {
				setTimeout(function() {
					var slide3 = new auiSlide({
						container: document.getElementById("aui-slide3"),
						// "width":300,
						"height": 300,
						//               "height":(document.documentElement.clientWidth || document.body.clientWidth)*400/750,
						"speed": 300,
						"autoPlay": 3000, //自动播放
						"pageShow": true,
						"loop": true,
						"pageStyle": 'dot',
						'dotPosition': 'center'
					});
				}, 500);

			}
		},
		mounted: function() {
			this.$nextTick(function() {

				// 代码保证 this.$el 在 document 中
				let _this = this;
				if(!(_this.list && _this.list.length === 0)) {
					console.log((document.documentElement.clientWidth || document.body.clientWidth) * 400 / 750)
					_this.renderSlider();
				}
			})
		},

	}
</script>
<style type="text/css">
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
</style>