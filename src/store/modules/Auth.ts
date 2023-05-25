// store/modules/auth.ts
import { Module } from 'vuex';
import { login, logout } from '@/api/User';

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
      },
  },
  actions: {
    async login({ commit }, loginReq) {
      try {
        const response = await login(loginReq);
        commit('setLoggedIn', true);
        commit('setAccessToken', response.data.data.access_token);
      } catch (error) {
        console.error('로그인에 실패하셨습니다.');
      }
    },
    async logout({ commit, state }) {
      try {
        const headers = {
          Authorization: `${state.access_token}`,
        };

        await logout(headers);
        commit('setLoggedIn', false);
        commit('setAccessToken', '');
      } catch (error) {
        console.error('로그아웃에 실패하셨습니다.');
      }
    },
  },
};

export default authModule;
