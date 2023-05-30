import { Module } from 'vuex';
import { login, logout } from '@/api/User';
import { reissue } from '../../api/User';

interface AuthState {
  isLoggedIn: boolean;
  access_token: string;
  userInfo: string;
}

const authModule: Module<AuthState, any> = {
  state: {
    isLoggedIn: false,
    access_token: '',
    userInfo: '',
  },
  getters: {
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },
    getAccessToken(state) {
      return state.access_token;
    },
    getUserInfo(state) {
      return state.userInfo;
    }
  },
  mutations: {
    setLoggedIn(state, isLoggedIn: boolean) {
      state.isLoggedIn = isLoggedIn;
    },
    setAccessToken(state, access_token: string) {
      state.access_token = access_token;
    },
    setUserInfo(state, userInfo: string) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    async login({ commit }, loginReq) {
      try {
        // 로그인 API 요청
        const response = await login(loginReq);
         if (response.data.code === 'SUCCESS') { // 로그인 성공 시
          
          commit('setLoggedIn', true); // 로그인 상태로 업데이트
          commit('setAccessToken', response.data.data.access_token); // access-token 값 세팅
          localStorage.setItem('user', response.data.data.access_token); // 로컬 스토리지에 토큰 값 저장
        } else {
          // 서버측에서 커스터마이징한 오류 분기 처리
          if (response.data.code === 'U0001') {
            alert(response.data.message);
          } else if (response.data.code === 'U0002') {
            alert(response.data.message);
          } else if (response.data.code === 'U0003') {
            alert(response.data.message);
          } else if (response.data.code === 'U0004') {
            alert(response.data.message);
          }
          // 로그인 실패 처리
          commit('setLoggedIn', false);
          commit('setAccessToken', '');
        }

      } catch (error) {
        alert('로그인에 실패하셨습니다.'); // To-Do
      }
    },
    async logout({ commit, state }) {
      try {
        // 로그아웃 요청에 필요한 access-token 헤더에 세팅
        const headers = {
          Authorization: `${state.access_token}`,
        };
        // 로그아웃 API 요청
        await logout(headers);
        commit('setLoggedIn', false); // 로그아웃 상태로 업데이트
        commit('setAccessToken', ''); // access-toekn 빈 값으로 초기화
        localStorage.removeItem('user');
      } catch (error) {
        console.error('로그아웃에 실패하셨습니다.');
      }
    },
    async reissue({ commit }, accessToken) {
      try {
        // 토큰 재발급 API 요청
        const reqDto = `Bearer ${accessToken}`;
        const response = await reissue(reqDto);
        if (response.data.code === 'SUCCESS') {
          commit('setAccessToken', response.data.data.access_token);
          commit('setLoggedIn', true); // 로그인 상태로 업데이트
        }
        
      } catch (error) {
        alert('토큰 재발급에 실패하셨습니다.');
        commit('setLoggedIn', false);
        commit('setAccessToken', '');
        localStorage.removeItem('user');
      }
    },

  },
};

export default authModule;
