<template>
	<div id="footer">
		<ul>
			<li>
				<router-link to="/index">
					<i class="iconfont">&#xe6bc;</i>
					<div class="aui-bar-tab-label">首页</div>
				</router-link>
			</li>
			<li>
				<router-link to="/rules">
					<i class="iconfont">&#xe630;</i>
					<div class="aui-bar-tab-label">规则</div>
				</router-link>
			</li>
			<li>
				<router-link to="/prizes">
					<i class="iconfont">&#xe64b;</i>
					<div class="aui-bar-tab-label">奖品</div>
				</router-link>
			</li>
			<li>
				<router-link to="/ranking">
					<i class="iconfont">&#xe631;</i>
					<div class="aui-bar-tab-label">榜单</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'BottomNav',
		data() {
			return {

			}
		},
		computed: {
			//是否在投票范围
			isEnroltime() {
				return this.$store.state.isEnroltime;
			},
		}
		
	}
</script>