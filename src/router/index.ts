import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store';
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
    path: '/odori',
    name: 'odori',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/tech',
    name: 'tech',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/retro',
    name: 'retro',
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
    meta: {requiresAuth: true},
    component: () => import('../views/RecordCreate.vue'),
    // props: true,
  },
  {
    path: '/records/update/:id',
    name: 'RecordUpdate',
    meta: {requiresAuth: true},
    component: () => import('../views/RecordCreate.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LogInView.vue'),
    // props: true,
  },
  {
    path: '/mypage',
    name: 'MyPage',
    meta: {requiresAuth: true},
    component: () => import('../views/MyPageView.vue'),
    // props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');
  if(to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next() // 권한이 필요 없는 페이지
});

export default router
