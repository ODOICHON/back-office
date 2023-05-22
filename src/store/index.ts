import { createStore } from 'vuex'
import { boardModule } from '@/store/modules/Board';

// 모듈 형태로 store 관리를 위해 아래와 같이 modules만을 두었다.
const store = createStore({
  modules: {
    boards : boardModule
  }
})
export default store;