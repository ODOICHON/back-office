// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// const app = createApp(App);

// app.use(store).use(router).mount('#app')

// app.config.globalProperties.$store = store;

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios, { AxiosError } from 'axios';

const app = createApp(App);

// 로그인 상태를 유지하기 위한 초기화 로직
const userString = localStorage.getItem('user');
if (userString) {
  const userData = JSON.parse(userString);
  store.commit('setAccessToken', userData);
  store.commit('setLoggedIn', true);
}

// 401 에러 처리를 위한 axios 인터셉터
axios.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    console.log(error);

    if (error.response?.status === 401) {
      store.dispatch('logout');
    }

    return Promise.reject(error);
  }
);

app.use(router);
app.use(store);
app.mount('#app');
