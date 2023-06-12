import { createStore } from 'vuex'
import { recordModule } from '@/store/modules/Record';
import authModule from './modules/Auth';
import { reviewModule } from './modules/Review';

// 모듈 형태로 store 관리를 위해 아래와 같이 modules만을 두었다.
const store = createStore({
  modules: {
    records : recordModule,
    auth: authModule,
    review: reviewModule,
  },
  getters : {
    loggedIn(state) {
      return state.auth.isLoggedIn
    },
    reviewFilter(state) {
      return state.reocrds.myPageFilter
    },
    currentUser(state) {
      return state.auth.userInfo
    }
  },
})
export default store;