import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/layout';
import DisplayLayout from '@/layout-display';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},

{
  path: '/welcome',
  name: 'Welcome',
  component: () => import('@/views/welcome/index'),
  meta: { title: '系统菜单', icon: 'menu' },
  hidden: true
},

{
  path: '/',
  component: DisplayLayout,
  redirect: '/dashboard/wellcover',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: { title: '仪表盘', icon: 'dashboard' }
  }, {
    path: 'dashboard/wellcover',
    name: 'DashboardWellcover',
    component: () => import('@/views/dashboard/wellcover/index'),
    meta: { title: '井盖设备', icon: 'dashboard' }
  }, {
    path: 'dashboard/water',
    name: 'DashboardWater',
    component: () => import('@/views/dashboard/water/index'),
    meta: { title: '水质监测', icon: 'dashboard' }
  }]
},

{
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  meta: { title: 'Example', icon: 'example' },
  children: [{
    path: 'map',
    name: 'Map',
    component: () => import('@/views/map/index'),
    meta: { title: '地图', icon: 'map' }
  }, {
    path: 'echarts',
    name: 'Echarts',
    component: () => import('@/views/echarts/index'),
    meta: { title: '图表', icon: 'echarts' }
  }, {
    path: 'table',
    name: 'Table',
    component: () => import('@/views/test/index'),
    meta: { title: 'Table', icon: 'table' }
  }, {
    path: 'tree',
    name: 'Tree',
    component: () => import('@/views/test/index'),
    meta: { title: 'Tree', icon: 'tree' }
  }]
},

// 404 page must be placed at the end !!!
{ path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
