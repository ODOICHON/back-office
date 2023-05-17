import { fetchBoards, getBoards } from '@/api/AxiosService';
import { Module } from 'vuex';
import BoardType, { BoardData, BoardPageType } from '@/types/BoardType';

// board에 대한 store 관리
export const boardModule: Module<any, any> = {
  state: { // 상태 ( 멤버 변수라고 생각하면 될 거 같다. )
    boards: [] as BoardType[],
    contents : [] as BoardData[],
    totalPages : 0,
  },
  mutations: { // getter & setter 용도처럼 사용한다고 보면 될 거 같다.
    setBoards(state, boards: BoardType[]) {
      state.boards = boards;
    },
    setBoardPages(state, contents: BoardData[]) {
        state.contents = contents;
    },
    setTotalPages(state, totalPages: number) {
        state.totalPages = totalPages;
    }
  },
  actions: { // 비동기 처리를 할 때 사용한다. 
    async fetchBoards({ commit }) {
      try {
        const response = await fetchBoards(0);
        commit('setBoardPages', response.data.data.content);
        commit('setTotalPages', response.data.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    },

    async getBoards({commit}, id : number) {
        try {
            const response = await getBoards(id);
            commit('setBoards', response.data.data);
        } catch (error) {
            console.error(error);
        }
    },
  },
};

