
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
const app = createApp(App);

// 로그인 상태를 유지하기 위한 초기화 로직
const userString = localStorage.getItem('user');
if (userString) {
  store.commit('setAccessToken', userString);
  store.commit('setLoggedIn', true);
  store.commit('setNickName', localStorage.getItem('nick_name'));
}

app.use(router);
app.use(store);
app.mount('#app');
