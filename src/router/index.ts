import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
/*
  해당 파일은 라우팅을 위한 정보를 담고 있다.
  url path와 컴포넌트를 매핑시켜준다.
*/
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/intro',
    name: 'intro',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/skill',
    name: 'skill',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/review',
    name: 'review',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/records/:id',
    name: 'RecordDetail',
    component: () => import('../components/RecordDetail.vue'),
    // props: true,
  },
  {
    path: '/records/write',
    name: 'RecordCreate',
    component: () => import('../views/RecordCreate.vue'),
    // props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LogInView.vue'),
    // props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
