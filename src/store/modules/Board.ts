import { getBoards, getBoard, getBoardsWithCategory } from '@/api/AxiosService';
import { Module } from 'vuex';
import BoardType, { BoardData, BoardPageType } from '@/types/BoardType';

// board에 대한 store 관리
export const boardModule: Module<any, any> = {
  state: { // 상태 ( 멤버 변수라고 생각하면 될 거 같다. )
    boards: [] as BoardType[],
    contents : [] as BoardData[],
    totalPages : 0,
    page : 0,
    category: '',
  },
  mutations: { // getter & setter 용도처럼 사용한다고 보면 될 거 같다.
    setBoard(state, boards: BoardType[]) {
      state.boards = boards;
    },
    setBoardPages(state, contents: BoardData[]) {
        state.contents = contents;
    },
    setTotalPages(state, totalPages: number) {
        state.totalPages = totalPages;
    },
    setPage(state, totalElements: number) {
      state.page = totalElements%4 == 0 ? Math.floor(totalElements/4) : Math.floor(totalElements/4)+1;
    },
    setCategory(state, category: string) {
      state.category = category;
    }
  },
  actions: { // 비동기 처리를 할 때 사용한다. 
    async getBoards({ commit }, page: number) {
      try {
        const response = await getBoards(page);
        commit('setBoardPages', response.data.data.content);
        commit('setTotalPages', response.data.data.totalPages);
        commit('setPage', response.data.data.totalElements);
      } catch (error) {
        console.error(error);
      }
    },

    async getBoard({commit}, id : number) {
        try {
            const response = await getBoard(id);
            commit('setBoard', response.data.data);
        } catch (error) {
            console.error(error);
        }
    },

    async getBoardsWithCategory({ commit }, name: string) {
      try {
        const response = await getBoardsWithCategory(name);
        console.log('success with data');
        commit('setBoardPages', response.data.data.content);
        commit('setTotalPages', response.data.data.totalPages);
        commit('setPage', response.data.data.totalElements);
      } catch (error) {
        console.error(error);
      }
    },
  },
};

