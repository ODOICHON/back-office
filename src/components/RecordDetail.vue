<template>
    <article class="blog-post">
        <div class="btn-container text-end">
            <button class="btn" @click="moveToUpdate(selectedItem.record_id)">수정</button> <button class="btn btn-danger" @click="deleteItem(selectedItem.record_id)">삭제</button>
        </div>
        <p class="blog-post-meta">{{ selectedItem?.create_at }} by {{ selectedItem?.nick_name }}   <strong class="d-inline-block mb-2 text-primary"> {{ selectedItem?.part }}</strong></p> 
        <h2 class="blog-post-title mb-1">{{ selectedItem?.title }}</h2>
        
        <div id="viewer" class="overflow-hidden flex-md-row mb-4 h-md-250 position-relative"> </div>
    </article>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import { Editor, EditorCore, Viewer } from '@toast-ui/editor'; // 수정된 import 문

export default defineComponent({
    name: 'RecordDetail',
    components : {
        viewer: document.querySelector('#viewer') as HTMLElement,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const recordId = computed(() => route.params.id);
        const selectedItem = computed(() => store.state.records.records);

        onMounted(() => {
            getRecord(Number(recordId.value));
        });
        const getRecord = (id: number) => {
            store.dispatch('getRecord', id).then(() => {
                const v = EditorCore.factory({
                    el: document.querySelector('#viewer') as HTMLElement,
                    initialValue : selectedItem.value.content,
                    viewer: true,
                }) as Viewer
            });
        };
        const moveToUpdate = (id: number) => {
            router.push({
               path : `/records/update/${id}`
            });
        };
        const deleteItem = (id: number) => {
            store.dispatch('deleteRecord', id).then(() => {
                router.push('/');
            });
        };

        return {
            selectedItem,
            moveToUpdate,
            deleteItem
        };
    },
    
});
</script>
  
<style scoped>
article {
    padding-left: 70px;
    padding-right: 70px;
    margin-bottom: 40px;
    margin-top: 40px;
    /* height: 500px; */
}
</style>
  