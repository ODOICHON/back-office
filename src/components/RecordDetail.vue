<template>
    <article class="blog-post">
        <p class="blog-post-meta">{{ selectedItem?.create_at }} by {{ selectedItem?.nick_name }}   <strong class="d-inline-block mb-2 text-primary"> {{ selectedItem?.part }}</strong></p> 
        <h2 class="blog-post-title mb-1">{{ selectedItem?.title }}</h2>
        
        <div id="viewer" class="overflow-hidden flex-md-row mb-4 h-md-250 position-relative"> </div>
    </article>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
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

        return {
            selectedItem,
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
  