<template>
  <div class="row g-1" id="container">
    <board-list :boards="boards"></board-list>
    <side-var :boards="boards"></side-var>
    <!-- TO-DO 다음 페이지 데이터 입히기-->
    <nav aria-label="Page navigation example" class="col-md-6">
      <ul class="pagination justify-content-center">
        <li class="page-item" v-for="idx in page" :key="idx"><a class="page-link" @click="fetchData(Number(idx))">{{ idx
        }}</a></li>
      </ul>

    </nav>
    <div class="col-md-6 text-start">
      <button type="button" class="btn btn-outline-secondary me-2" @click="createData()">글쓰기</button>
    </div>
  </div>
</template>

<script lang="ts">
import BoardList from '@/components/BoardList.vue'
import SideVar from '@/components/SideVar.vue'
import { onMounted, PropType, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',
  components: {
    BoardList,
    SideVar
  },
  setup() {
    const store = useStore(); // store 객체 사용을 위해 선언
    const router = useRouter();

    const boards = computed(() => store.state.boards.contents); // 미리 값 세팅
    const totalPages = computed(() => store.state.boards.totalPages);
    const page = computed(() => store.state.boards.page);

    const createData = () => {
      router.push({
        path: "/boards/write",
      });
    };

    // 게시글 리스트 조회 함수 정의
    const fetchData = (page: number) => {
      store.dispatch('getBoards', page - 1);
    };

    // 페이지 렌더링 시, 실행되는 함수
    onMounted(() => {
      const id = 1;
      fetchData(id);
    });

    return {
      boards,
      totalPages,
      page,
      fetchData,
      createData
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