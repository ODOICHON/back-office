<template>
    <div class="col mb-2" id="board-container" >
        <!-- 게시글 카드 4개씩 페이지네이션  -->
        <div class="row-md-5 text-start" v-for="board in boards" :key="board.boardId">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-primary">{{ board.category }}</strong>
                    <h3 class="mb-0">{{ board.title }}</h3>
                    <div class="mb-1 text-body-secondary">{{ board.createdAt }}</div>
                    <p class="card-text mb-auto">{{ board.nickName }}</p>
                    <router-link :to="`/boards/${board.boardId}`" @click="fetchItem(board.boardId)">자세히보기</router-link>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script lang="ts">
import BoardType, { BoardData, BoardPageType } from '@/types/BoardType';
import { PropType, ref } from 'vue';
import { getBoards } from '@/api/AxiosService';
import { useStore } from 'vuex';

export default {
    name : 'BoardList',
    props: {
    boards: {
        required: true,
        type: Array as PropType<BoardData[]> ,
        // type: Array as PropType<BoardType[]>
    }
  }, 
  setup() {
    const store = useStore();
    const selectedItem = ref<BoardType | null>(null);

    const fetchItem = async (id: number) => {
      try {
        const response = await getBoards(id);
        selectedItem.value = response.data.data;
        console.log("click detail");
        store.state.boards.boards = response.data.data;
      } catch (error) {
        console.error(error);
      }
    };

    return {
        selectedItem,
        fetchItem
    }
  }
}
</script>

<style scoped>
#board-container {
    margin-left: 100px;
}

</style>