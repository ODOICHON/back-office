
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { UserData } from './types/UserType';
const app = createApp(App);

// 로그인 상태를 유지하기 위한 초기화 로직
const userString = localStorage.getItem('user');
const adminString = localStorage.getItem('admin');

const userState : UserData = JSON.parse(userString!);

if (userState) {
  console.log(userState.state.token.access_token);
  console.log(userState.state.user.nick_name);
  store.commit('setAccessToken', userState.state.token.access_token);
  store.commit('setLoggedIn', true);
  // store.commit('setNickName', localStorage.getItem('nick_name'));
} else if(adminString) {
  const userInfo = localStorage.getItem('userInfo');
  store.commit('setAccessToken', adminString);
  store.commit('setLoggedIn', true);
  store.commit('setUserInfo', JSON.parse(userInfo!));
}

app.use(router);
app.use(store);
app.mount('#app');
