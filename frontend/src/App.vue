<template>
	<div id="app">
		<Marquee tips="投票时间截至到2017-11-11日"></Marquee>
		<!--   <images src="./assets/logo.png">-->
		<div class="wrap">
			<transition enter-active-class="next-enter">
				<router-view class="full-h"></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
	import Marquee from './views/common/Marquee.vue'
	import BottomNav from './views/common/BottomNav.vue'
	export default {
		data() {
			return {}
		},
		name: 'app',
		components: {
			Marquee,
			BottomNav
		}
	}
</script>

<style lang="less"  type="text/css">
	@import './assets/css/main';
	#app {
		text-align: center;
		color: #333;
		padding-top: 1.6rem;
		font-family: Arial, 'Times New Roman', 'Microsoft YaHei', SimHei;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	img {
		display: inline-block;
		max-width: 100%;
	}
	/*场景切换*/
	
	.wrap {
		position: relative;
		height: 100%;
	}
	
	.full-h {
		min-height: calc(100vh - 50px);
		background: #ebebeb;
	}
	
	.next-enter {
		z-index: 1002;
		-webkit-animation: pageFromRightToCenter 500ms forwards;
		animation: pageFromRightToCenter 500ms forwards
	}
	
	.next-leave {
		z-index: 1001;
		-webkit-animation: pageFromCenterToLeft 500ms forwards;
		animation: pageFromCenterToLeft 500ms forwards
	}
	
	.prev-enter {
		z-index: 1001;
		-webkit-animation: pageFromLeftToCenter 500ms forwards;
		animation: pageFromLeftToCenter 500ms forwards
	}
	
	.prev-leave {
		z-index: 1002;
		-webkit-animation: pageFromCenterToRight 500ms forwards;
		animation: pageFromCenterToRight 500ms forwards;
	}
	
	@-webkit-keyframes pageFromRightToCenter {
		from {
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
			opacity: .9;
		}
		to {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
			opacity: 1;
		}
	}
	
	@keyframes pageFromRightToCenter {
		from {
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
			opacity: .9;
		}
		to {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
			opacity: 1;
		}
	}
	
	@-webkit-keyframes pageFromCenterToRight {
		from {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
			opacity: 1;
		}
		to {
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
			opacity: .9;
		}
	}
	
	@keyframes pageFromCenterToRight {
		from {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
			opacity: 1;
		}
		to {
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
			opacity: .9;
		}
	}
	
	.page-from-center-to-left {
		-webkit-animation: pageFromCenterToLeft 500ms forwards;
		animation: pageFromCenterToLeft 500ms forwards;
	}
	
	.page-from-left-to-center {
		-webkit-animation: pageFromLeftToCenter 500ms forwards;
		animation: pageFromLeftToCenter 500ms forwards;
	}
	
	@-webkit-keyframes pageFromCenterToLeft {
		from {
			opacity: 1;
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
		to {
			opacity: 0.5;
			-webkit-transform: translate3d(-20%, 0, 0);
			transform: translate3d(-20%, 0, 0);
		}
	}
	
	@keyframes pageFromCenterToLeft {
		from {
			opacity: 1;
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
		to {
			opacity: 0.5;
			-webkit-transform: translate3d(-20%, 0, 0);
			transform: translate3d(-20%, 0, 0);
		}
	}
	
	@-webkit-keyframes pageFromLeftToCenter {
		from {
			opacity: .5;
			-webkit-transform: translate3d(-20%, 0, 0);
			transform: translate3d(-20%, 0, 0);
		}
		to {
			opacity: 1;
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
	}
	
	@keyframes pageFromLeftToCenter {
		from {
			opacity: .5;
			-webkit-transform: translate3d(-20%, 0, 0);
			transform: translate3d(-20%, 0, 0);
		}
		to {
			opacity: 1;
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
	}
</style>