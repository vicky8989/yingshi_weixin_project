import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/readme',
      component: resolve => require(['../components/Home.vue'], resolve),
      children: [{
        path: '/index',
        component: Index
      },{
        path:'/admin',
        component:resolve => require(['../views/Admin.vue'], resolve)
      },
      {
      	path:'/setting/:id?',
      	component:resolve => require(['../views/VoteSetting.vue'], resolve)
      },{
        path:'/votes/:id?',
        component:resolve => require(['../views/votesPage.vue'], resolve)
      },{
        path:'/signer/:id?',
        component:resolve => require(['../views/Signers.vue'], resolve)
      },{
        path:'/present',
        component:resolve => require(['../views/Present.vue'], resolve)
      }]
    },
    {
      path: '/login',
      component: resolve => require(['../views/Login.vue'], resolve)
    }
  ]
})
