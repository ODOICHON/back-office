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
import BoardType from '@/types/BoardType';
import { getBoards } from '@/api/AxiosService';

export default defineComponent({
    name: 'BoardDetail',
    setup() {
        const route = useRoute();
        const boardId = computed(() => route.params.id);
        const selectedItem = ref<BoardType | null>(null); // 반응형으로 값의 변경을 감지하기 위해 선언

        const fetchItem = async (id: number) => {
            try {
                const response = await getBoards(id);
                selectedItem.value = response.data.data;
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(() => {
            fetchItem(Number(boardId.value));
        });

        return {
            selectedItem,
        };
    },
});
</script>
  