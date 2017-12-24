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
      },
      {
      	path:'/setting/:id?',
      	component:resolve => require(['../views/VoteSetting.vue'], resolve)
      },{
        path:'/votes',
        component:resolve => require(['../views/votesPage.vue'], resolve)
      },{
        path:'/signer',
        component:resolve => require(['../views/Signers.vue'], resolve)
      }]
    },
    {
      path: '/login',
      component: resolve => require(['../views/Login.vue'], resolve)
    }
  ]
})
