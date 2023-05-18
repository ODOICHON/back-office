<template>
    <div class="col-md-4" id="side-var">
        <div class="position-sticky" style="top: 2rem;">
            <!-- 카테고리 키워드 리스트 -->
            <div class="p-4">
                <h4 class="fst-italic">Category</h4>
                <ol class="list-unstyled mb-0">
                    <li><router-link :to="`/`" @click="getBoardsWithCategory(category[0])">{{ category[0] }}</router-link></li>
                    <li><router-link :to="`/`" @click="getBoardsWithCategory(category[1])">{{ category[1] }}</router-link></li>
                    <li><router-link :to="`/`" @click="getBoardsWithCategory(category[2])">{{ category[2] }}</router-link></li>
                </ol>
            </div>
            <!-- 금주의 인기 게시물 리스트 ( TOP 3 ) -->
            <div class="p-4">
                <h4 class="fst-italic">HOT POSTS</h4>
                <ol class="list-unstyled" v-for="board, idx in boards" :key="board.boardId">
                    <li><router-link :to="`/boards/${board.boardId}`" @click="getBoard(board.boardId)" v-if="idx < 3">{{ board.title }}</router-link></li>
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

export default {
    name: 'SideVar',
    props: {
    boards: {
        required: true,
        type: Array as PropType<BoardData[]> ,
    },
    },
    setup() {
    const store = useStore();
    const category = ['TREND', 'REVIEW', 'DAILY'];

    const getBoard = (id: number) => {
        store.dispatch('getBoard', id);
    };

    const getBoardsWithCategory = (name : string) => {
        store.dispatch('getBoardsWithCategory', name);
    };

    return {
        getBoard,
        getBoardsWithCategory,
        category,
    }
  }
}
</script>

<style scoped>
#side-var{
    margin-left: 100px;
    text-align: left;
}
a {
  text-decoration-line: none;
  color : black;
}
</style>