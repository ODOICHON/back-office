import { getRecordList, getRecord, createRecord, getHotRecordList, updateRecord, deleteRecord, getRecordListMine, getRecordListApply, getRecordListReviewed, getRecordListWait } from '@/api/Record';
import { Module } from 'vuex';
import RecordType, { RecordCreateReq, RecordData, RecordHotType, RecordPageType, RecordReqParam, RecordUpdateReq } from '@/types/RecordType';
import { filters } from '@/constants/myPageFilter';
import { CommentReq } from '@/types/Comment';
import { createComment, deleteComment } from '@/api/Comment';

// board에 대한 store 관리
export const recordModule: Module<any, any> = {
  state: { // 상태 ( 멤버 변수라고 생각하면 될 거 같다. )
    records: {} as RecordType, // 게시글 단일 조회 시 받아오는 데이터
    contents : [] as RecordData[], // 페이징 처리로 받아오는 데이터
    hotRecords: [] as RecordHotType[], // 금주의 핫 게시물 데이터
    myRecords: [] as RecordData[], // 마이페이지에서 조회하는 데이터
    myPageFilter: '', // 마이페이지에서 사용되는 필터 ( 필터에 따른 페이징 처리를 위해 사용 )
    totalPages : 0,
    page : 0,
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
    },
    setMyRecordList(state, myRecords : RecordData[]) {
      state.myRecords = myRecords;
    },
    setMypageFilter(state, filter : string) {
      state.myPageFilter = filter;
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

    async updateRecord({commit, state, rootState}, req: RecordUpdateReq) {
      try {
        const headers = {
          Authorization: `${rootState.auth.access_token}`,
        };
        const response = await updateRecord(req, state.records.record_id, headers);
        commit('setRecordId', response.data.data);
      } catch (error) {
        console.error(error);
      }

    },

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
    },
    async deleteRecord({commit, rootState}, id: number) {
      try {
        const headers = {
          Authorization: `${rootState.auth.access_token}`,
        };
        const response = await deleteRecord(id, headers);
        console.log(response.data);
        commit('setRecordId', 0);
        commit('setRecord', null);
      } catch (error) {
        console.error(error);
      }
    },
    async getRecordListMine({commit, rootState}, id : number) {
      try {
        const headers = {
          Authorization: `${rootState.auth.access_token}`,
        };
        const response = await getRecordListMine(id, headers);
        commit('setMyRecordList', response.data.data.records.content);
        commit('setTotalPages', response.data.data.records.totalPages);
        commit('setPage', response.data.data.records.totalElements);
        commit('setMypageFilter', filters[0]);
      } catch (error) {
        console.error(error);
      }
    },
    async getRecordListReviewed({commit, rootState}, id : number) {
      try {
        const headers = {
          Authorization: `${rootState.auth.access_token}`,
        };
        const response = await getRecordListReviewed(id, headers);
        commit('setMyRecordList', response.data.data.records.content);
        commit('setTotalPages', response.data.data.records.totalPages);
        commit('setPage', response.data.data.records.totalElements);
        commit('setMypageFilter', filters[1]);
      } catch (error) {
        console.error(error);
      }
    },
    async getRecordListWait({commit, rootState}, id : number) {
      try {
        const headers = {
          Authorization: `${rootState.auth.access_token}`,
        };
        const response = await getRecordListWait(id, headers);
        commit('setMyRecordList', response.data.data.records.content);
        commit('setTotalPages', response.data.data.records.totalPages);
        commit('setPage', response.data.data.records.totalElements);
        commit('setMypageFilter', filters[2]);
      } catch (error) {
        console.error(error);
      }
    },
    async getRecordListApply({commit, rootState}, id : number) {
      try {
        const headers = {
          Authorization: `${rootState.auth.access_token}`,
        };
        const response = await getRecordListApply(id, headers);
        commit('setMyRecordList', response.data.data.records.content);
        commit('setTotalPages', response.data.data.records.totalPages);
        commit('setPage', response.data.data.records.totalElements);
        commit('setMypageFilter', filters[3]);
      } catch (error) {
        console.error(error);
      }
    },
    async createComment({commit, rootState}, req: CommentReq) {
      try {
        const headers = {
          Authorization: `${rootState.auth.access_token}`,
        };
        const response = await createComment(req, headers);
        // alert(`${response.data.data} d???` );
      } catch (error) {
        console.error('댓글 생성에 실패하셨습니다.');
      }
    },
    async deleteComment({commit, rootState}, commentId: number) {
      try {
        const headers = {
          Authorization: `${rootState.auth.access_token}`,
        };
        const response = await deleteComment(commentId, headers);
      } catch (error) {
        console.error('댓글 삭제에 실패하셨습니다.');
      }
    }
  },
};

