/**
 * Created by wty on 2017/10/10.
 */

const routes = [{
		path: '/',
		name: 'index',
		component: resolve => {
			require(['../views/index.vue'], resolve)
		}
	},
	{
		path: '/index',
		name: 'index',
		component: resolve => {
			require(['../views/index.vue'], resolve)
		}
	},
	{
		path: '/votes/:id/:openid?',
		name: 'votes',
		component: resolve => {
			require(['../views/votes.vue'], resolve)
		}
	},
	{
		path: '/gift',
		name: 'gift',
		component: resolve => {
			require(['../views/gift.vue'], resolve)
		}
	},
	{
		path: '/recruit',
		name: 'recruit',
		component: resolve => {
			require(['../views/recruit.vue'], resolve)
		}
	},
	{
		path: '/prizes',
		name: 'prizes',
		component: resolve => {
			require(['../views/prizes.vue'], resolve)
		}
	},
	{
		path: '/ranking',
		name: 'ranking',
		component: resolve => {
			require(['../views/ranking.vue'], resolve)
		}
	},
	//404页面
	{
		path: '*',
		name: '404',
		component: resolve => {
			require(['../views/common/Error.vue'], resolve)
		}
	},
]

export default routes