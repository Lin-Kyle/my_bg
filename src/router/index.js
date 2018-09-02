import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import basicLayout from '@layout/basicLayout'
import indexLayout from '@layout/indexLayout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: '/',
    component: indexLayout,
    redirect: '/dashboard',
    name: 'user',
    hidden: true,
    children: [{
      path: 'login',
      component: () => import('@layout/indexLayout/components/login')
    }, {
      path: 'register',
      component: () => import('@layout/indexLayout/components/register')
    }]
  },
  { path: '/404', component: () => import('@page/404'), hidden: true },

  {
    path: '/',
    component: basicLayout,
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@page/dashboard')
    }]
  },

  {
    path: '/lotteryActivity',
    component: basicLayout,
    name: 'lotteryActivity',
    meta: { title: '抽奖活动管理', icon: 'example' },
    children: [
      {
        path: 'index',
        component: () => import('@page/lotteryActivity/index'),
        meta: { title: '抽奖活动', icon: 'table' }
      },
      {
        path: 'detail/:id?',
        component: () => import('@page/lotteryActivity/detail'),
        meta: { title: '新建抽奖', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/applicationActivity',
    component: basicLayout,
    name: 'applicationActivity',
    meta: { title: '申领活动管理', icon: 'example' },
    children: [
      {
        path: 'index',
        component: () => import('@page/applicationActivity/index'),
        meta: { title: '申领活动', icon: 'table' }
      },
      {
        path: 'detail/:id?',
        component: () => import('@page/applicationActivity/detail'),
        meta: { title: '申领创建', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/brandActivity',
    component: basicLayout,
    name: 'brandActivity',
    meta: { title: '品牌活动管理', icon: 'example' },
    children: [
      {
        path: 'index',
        component: () => import('@page/brandActivity/index'),
        meta: { title: '品牌活动', icon: 'table' }
      },
      {
        path: 'detail/:id?',
        component: () => import('@page/brandActivity/detail'),
        meta: { title: '品牌活动创建', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/drawTheOrder',
    component: basicLayout,
    name: 'drawTheOrder',
    meta: { title: '抽奖订单', icon: 'example' },
    children: [
      {
        path: 'index',
        component: () => import('@page/drawTheOrder/detail'),
        meta: { title: '抽奖订单', icon: 'tree' }
      }
    ]
  },
  {
    path: '/claimsForOrders',
    component: basicLayout,
    name: 'claimsForOrders',
    meta: { title: '申领订单', icon: 'example' },
    children: [
      {
        path: 'index',
        component: () => import('@page/claimsForOrders/detail'),
        meta: { title: '申领订单', icon: 'tree' }
      }
    ]
  },
  {
    path: '/audit',
    component: basicLayout,
    name: 'audit',
    meta: { title: '上首页审核', icon: 'example' },
    children: [
      {
        path: 'index',
        component: () => import('@page/audit/detail'),
        meta: { title: '上首页审核', icon: 'tree' }
      }
    ]
  },
  {
    path: '/generator',
    component: basicLayout,
    name: 'generator',
    meta: { title: '生成表单', icon: 'example' },
    children: [
      {
        path: 'index',
        component: () => import('@page/generator'),
        meta: { title: '生成表单', icon: 'tree' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
