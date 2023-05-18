<template>
    <div class="col-md-4" id="side-var">
        <div class="position-sticky" style="top: 2rem;">
            <!-- 카테고리 키워드 리스트 -->
            <div class="p-4">
                <h4 class="fst-italic">Category</h4>
                <ol class="list-unstyled mb-0">
                    <li><a href="#">WEB</a></li>
                    <li><a href="#">SERVER</a></li>
                    <li><a href="#">INFRA</a></li>
                </ol>
            </div>
            <!-- 금주의 인기 게시물 리스트 ( TOP 3 ) -->
            <div class="p-4">
                <h4 class="fst-italic">HOT POSTS</h4>
                <ol class="list-unstyled" v-for="board in boards" :key="board.boardId">
                    <li><router-link :to="`/boards/${board.boardId}`" @click="fetchItem(board.boardId)">{{ board.title }}</router-link></li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { useStore } from 'vuex';
import { computed, onMounted, PropType, ref } from 'vue';
import BoardType, { BoardData } from '@/types/BoardType';
import { getBoards } from '@/api/AxiosService';

export default {
    name: 'SideVar',
    props: {
    boards: {
        required: true,
        type: Array as PropType<BoardData[]> ,
        // type: Array as PropType<BoardType[]>
    },
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
#side-var{
    margin-right: 100px;
    text-align: left;
}
a {
  text-decoration-line: none;
  color : black;
}
</style>