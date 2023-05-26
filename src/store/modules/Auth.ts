// store/modules/auth.ts
import { Module } from 'vuex';
import { login, logout } from '@/api/User';
import axios from 'axios';

interface AuthState {
  isLoggedIn: boolean;
  access_token: string;
}

const authModule: Module<AuthState, any> = {
  state: {
    isLoggedIn: false,
    access_token : '',
  },
  mutations: {
    setLoggedIn(state, isLoggedIn: boolean) {
      state.isLoggedIn = isLoggedIn;
    },
    setAccessToken(state, access_token: string) {
        state.access_token = access_token;
        localStorage.setItem('user', JSON.stringify(access_token));
        // axios.defaults.headers.common['Authorization'] = `${access_token}`;
      },
    removeAccessToken(state) {
      state.access_token = '';
      localStorage.removeItem('user');
    }
  },
  actions: {
    async login({ commit }, loginReq) {
      try {
        const response = await login(loginReq);
        commit('setLoggedIn', true);
        commit('setAccessToken', response.data.data.access_token);
      } catch (error) {
        alert('로그인에 실패하셨습니다.'); // To-Do
      }
    },
    async logout({ commit, state }) {
      try {
        const headers = {
          Authorization: `${state.access_token}`,
        };

        await logout(headers);
        commit('setLoggedIn', false);
        commit('removeAccessToken');
      } catch (error) {
        console.error('로그아웃에 실패하셨습니다.');
      }
    },
  },
};

export default authModule;
