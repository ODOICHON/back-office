
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { UserInfoRes } from './types/UserType';
const app = createApp(App);

// 로그인 상태를 유지하기 위한 초기화 로직
const userString = localStorage.getItem('user');
const adminString = localStorage.getItem('admin');
interface UserState {
  token : string;
  user : UserInfoRes;
}
const userState : UserState = JSON.parse(userString!);

if (userState) {
  console.log(userState.token);
  console.log(userState.user.nick_name);
  store.commit('setAccessToken', userState.token);
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
