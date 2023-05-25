import { getRecordList, getRecord, createRecord, getHotRecordList } from '@/api/Record';
import { Module } from 'vuex';
import RecordType, { RecordCreateReq, RecordData, RecordHotType, RecordPageType, RecordReqParam } from '@/types/RecordType';

// board에 대한 store 관리
export const recordModule: Module<any, any> = {
  state: { // 상태 ( 멤버 변수라고 생각하면 될 거 같다. )
    records: [] as RecordType[], // 게시글 단일 조회 시 받아오는 데이터
    contents : [] as RecordData[], // 페이징 처리로 받아오는 데이터
    hotRecords: [] as RecordHotType[], // 금주의 핫 게시물 데이터
    totalPages : 0,
    page : 0,
    category: '',
    recordId: 0,
  },
  mutations: { // getter & setter 용도처럼 사용한다고 보면 될 거 같다.
    setRecord(state, records: RecordType[]) {
      state.records = records;
    },
    setRecordPages(state, contents: RecordData[]) {
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
    },
    setRecordId(state, recordId: number) {
      state.recordId = recordId;
    },
    setHotRecordList(state, hotRecords : RecordHotType[]) {
      state.hotRecords = hotRecords;
    }
  },
  actions: { // 비동기 처리를 할 때 사용한다. 
    async getRecordList({ commit }, reqParam : RecordReqParam) {
      try {
        const response = await getRecordList(reqParam.page, reqParam.part, reqParam.type, reqParam.category);
        commit('setRecordPages', response.data.data.records.content);
        commit('setTotalPages', response.data.data.records.totalPages);
        commit('setPage', response.data.data.records.totalElements);
      } catch (error) {
        console.error(error);
      }
    },

    async getRecord({commit}, id : number) {
        try {
            const response = await getRecord(id);
            commit('setRecord', response.data.data);
        } catch (error) {
            console.error(error);
        }
    },

    // async getBoardsWithCategory({ commit }, name: string) {
    //   try {
    //     const response = await getBoardsWithCategory(name);
    //     console.log('contents   ' , response.data.data.records);
    //     commit('setRecordPages', response.data.data.records);
    //     commit('setTotalPages', response.data.data.totalPages);
    //     commit('setPage', response.data.data.totalElements);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

    async getHotRecordList({commit}) {
      try {
        const response = await getHotRecordList();
        commit('setHotRecordList', response.data.data.records);
      } catch (error) {
        console.error(error);
      }
    },
    
    async createRecord({commit, rootState}, req: RecordCreateReq) {
      try {
         const headers = {
          Authorization: `${rootState.auth.access_token}`,
        };
        const response = await createRecord(req, headers);
        console.log('success markdown saved ->>    ', response.data.data);
        commit('setRecordId', response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
  },
};

