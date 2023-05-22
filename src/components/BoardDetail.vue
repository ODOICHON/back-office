<template>
    <article class="blog-post">
        <h2 class="blog-post-title mb-1">{{ selectedItem?.title }}</h2>
        <p class="blog-post-meta">{{ selectedItem?.createdAt }} by {{ selectedItem?.nickName }}</p>

        <strong class="d-inline-block mb-2 text-primary">{{ selectedItem?.category }}</strong>

        <p>여기에 내용을 담고 싶은데, code 값만 던지고 있어서 이건 Toast UI 적용 후에 해봐야 할 거 같습니다.!</p>
        
      </article>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'BoardDetail',
    setup() {
        const route = useRoute();
        const store = useStore();
        const boardId = computed(() => route.params.id);
        const selectedItem = computed(() => store.state.boards.boards);

        const getBoard = (id: number) => {
        store.dispatch('getBoard', id);

    };

        onMounted(() => {
            getBoard(Number(boardId.value));
        });

        return {
            selectedItem,
        };
    },
});
</script>
  