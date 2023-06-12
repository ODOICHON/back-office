<template>
  <div class="col g-1" id="container">
    <record-list :records="records"></record-list>
    
  </div>
</template>
<script lang="ts">
import RecordList from '@/components/RecordList.vue'
import { onMounted, PropType, reactive, ref, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import { defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { authComputed } from '@/store/helper'
import { RecordReqParam } from '@/types/RecordType'

export default {
  name: 'AboutView',
  components: {
    RecordList,
  },
  computed: {
        ...authComputed,
    },
  setup() {
    const store = useStore(); // store 객체 사용을 위해 선언
    const router = useRouter();
    const route = useRoute();
    const path = computed(() => route.name); // url path 값 추출
    const records = computed(() => store.state.records.contents); // 게시물 리스트 세팅
    const totalPages = computed(() => store.state.records.totalPages);
    const page = computed(() => store.state.records.page);

    const createData = () => {
      router.push({
        path: "/records/write",
      });
    };

    const navArr: { type: string; category: string[] }[] = [
      { type: 'odori', category: ['culture'] },
      { type: 'retro', category: ['retrospection'] },
      { type: 'tech', category: ['disaster', 'issue', 'new_tech', 'architecture'] },
    ];


    watch( // URL 변경될 때마다 데이터 재조회
      () => router.currentRoute.value,
      (to, from) => {

        // 데이터를 다시 조회하고 갱신합니다.
        fetchData(1);
      }
    );

    // 게시글 리스트 조회 함수 정의
    const fetchData = (page: number) => {

    // 분기처리
    const category = navArr.find((nav) => nav.type === path.value)?.category[0];
      const reqParam : RecordReqParam = { // To-Do 동적으로 요청 param 바뀌도록
        page: page-1,
        part : 'all',
        type: path.value as string,
        category: category as string
      };
      store.dispatch('getRecordList', reqParam);
    };

    

    // 페이지 렌더링 시, 실행되는 함수
    onMounted(() => {
      
      const id = 1;
      fetchData(id);
    });

    return {
      records,
      totalPages,
      page,
      fetchData,
      createData,
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