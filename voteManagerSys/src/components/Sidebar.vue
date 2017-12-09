<template>
	<div class="sidebar">
		<el-menu class="el-menu-vertical-demo" default-active="1">
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index">
						<template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
						<el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
						</el-menu-item>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index">
						<i :class="item.icon"></i>
						<span slot="title">{{ item.title }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	export default {
		name:'vSidebar',
		data() {
			return {
				items: [{
						icon: 'el-icon-location',
						index: '1',
						title: '我的活动'
					}
				]
			}
		},
		computed: {
			/*onRoutes() {
				return this.$route.path.replace('/', '');
			}*/
		}
	}
</script>

<style scoped lang='less'>
	.sidebar {
		display: block;
		position: absolute;
		width: 250px;
		left: 0;
		top: 70px;
		bottom: 0;
	}

	.sidebar>ul {
		height: 100%;
		background: #324157;
	}
</style>