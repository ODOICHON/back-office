<template>
  <div class="row g-1" id="container">
    <record-list :records="records"></record-list>
    <side-var :hotRecords="hotRecords"></side-var>
    
    <nav aria-label="Page navigation example" class="col-md-6">
      <ul class="pagination justify-content-center">
        <li class="page-item" v-for="idx in page" :key="idx"><a class="page-link" @click="fetchData(Number(idx))">{{ idx
        }}</a></li>
      </ul>

    </nav>
    <div class="col-md-6 text-start">
      <button type="button" class="btn btn-outline-secondary me-2" @click="createData()" v-if="loggedIn">글쓰기</button>
    </div>
  </div>
</template>

<script lang="ts">
import RecordList from '@/components/RecordList.vue'
import SideVar from '@/components/SideVar.vue'
import { onMounted, PropType, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router'
import { authComputed } from '@/store/helper'
import { RecordReqParam } from '@/types/RecordType'

export default {
  name: 'HomeView',
  components: {
    RecordList,
    SideVar
  },
  computed: {
        ...authComputed,
    },
  setup() {
    const store = useStore(); // store 객체 사용을 위해 선언
    const router = useRouter();

    const records = computed(() => store.state.records.contents); // 게시물 리스트 세팅
    const totalPages = computed(() => store.state.records.totalPages);
    const page = computed(() => store.state.records.page);

    const hotRecords = computed(() => store.state.records.hotRecords); // 금주의 핫 게시물 데이터 세팅

    const createData = () => {
      router.push({
        path: "/records/write",
      });
    };

    // 게시글 리스트 조회 함수 정의
    const fetchData = (page: number) => {
      const reqParam : RecordReqParam = { // To-Do 동적으로 요청 param 바뀌도록
        page: page-1,
        part : 'web',
        type: 'tech',
        category: 'disaster'
      };
      store.dispatch('getRecordList', reqParam);
    };

    const getHotRecordList = () => {
        store.dispatch('getHotRecordList');
    };

    // 페이지 렌더링 시, 실행되는 함수
    onMounted(() => {
      const id = 1;
      fetchData(id);
      getHotRecordList();
    });

    return {
      records,
      totalPages,
      page,
      fetchData,
      createData,
      hotRecords
    };

  },
}

</script>

<style scoped>
#page-conatiner {
  margin-bottom: 20px;
}

#container {
  margin-left: 100px;
  margin-right: 100px;
}
</style>