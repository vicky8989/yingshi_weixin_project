/**
 * Created by wty on 2017/10/10.
 */

import Home from '@/views/Home.vue'// 同步加载方式
const  routes=[
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/pink',
    name: 'pink',
    component: resolve => {require(['../views/Pink.vue'], resolve)} //异步加载方式
  },
  {
    path: '/vote',
    name: 'vote',
    component: resolve => {require(['../views/Vote.vue'], resolve)} //异步加载方式
  },
  {
    path: '/signin',
    name: 'signin',
    component: resolve => {require(['../views/SingIn.vue'], resolve)} //异步加载方式
  },
  {
    path: '/award',
    name: 'award',
    component: resolve => {require(['../views/Awards.vue'], resolve)} //异步加载方式
  },
  {
    path: '/index',
    name: 'index',
    component: resolve => {require(['../views/index.vue'], resolve)}
  },
  {
    path: '/votes/:id?',
    name: 'votes',
    component: resolve => {require(['../views/votes.vue'], resolve)}
  },
  {
    path: '/gift/:id?',
    name: 'gift',
    component: resolve => {require(['../views/gift.vue'], resolve)}
  },
  //404页面
  {
    path:'*',
    name:'404',
    component: resolve => {require(['../views/common/Error.vue'], resolve)}
  },
]

export default routes
