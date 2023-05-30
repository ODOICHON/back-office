
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios, { AxiosError } from 'axios';
import { restApi } from './api/AxiosService';

const app = createApp(App);

// 로그인 상태를 유지하기 위한 초기화 로직
const userString = localStorage.getItem('user');
if (userString) {
  store.commit('setAccessToken', userString);
  store.commit('setLoggedIn', true);
}
export interface ErrorResponse {
    code: string;
    message : string;
}

// 401 에러 처리를 위한 axios 인터셉터
restApi.interceptors.response.use(
  response => response,
  (error: AxiosError) => {

    if (error.response?.status === 401) {
      const data = error.response.data as ErrorResponse;
      if(data.code === 'J0002') { // 토큰 만료
          // localStorage.removeItem('user')!;
          const token = localStorage.getItem('user')?.split(" ")[1];
          console.log(token);
          store.dispatch('reissue', token);

      } else if(data.code === 'J0004') { // 잘못된 토큰
        alert('글로벌하게 정의한 오류 처리');

      }
    }
    return Promise.reject(error);
  }
);

app.use(router);
app.use(store);
app.mount('#app');
