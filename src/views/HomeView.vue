<template>
  <div class="row g-1">
    <board-list :boards="boards"></board-list>
    <side-var :boards="boards"></side-var>
    <!-- TO-DO 다음 페이지 데이터 입히기-->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" v-for="idx in totalPages" :key="idx"><a class="page-link" href="#">{{ idx }}</a></li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import BoardList from '@/components/BoardList.vue'
import SideVar from '@/components/SideVar.vue'
import { onMounted, PropType, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { defineComponent, computed } from 'vue';

export default {
  name: 'HomeView',
  components: {
    BoardList,
    SideVar
  },
  setup() {
    const store = useStore(); // store 객체 사용을 위해 선언
    const boards = computed(() => store.state.boards.contents); // 미리 값 세팅
    const totalPages = computed(() => store.state.boards.totalPages);

    // 게시글 리스트 조회 함수 정의
    const fetchData = (page: number) => {
      store.dispatch('fetchBoards', page);
    };
    // 페이지 렌더링 시, 실행되는 함수
    onMounted(() => {
      const id = 0;
      fetchData(id);
    });

    return {
      boards,
      totalPages,
      fetchData,
    };

  },
}

</script>

<style scoped>
#page-conatiner {
  margin-bottom: 20px;
}
</style>