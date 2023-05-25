<template>
    <article class="blog-post">
        <strong class="d-inline-block mb-2 text-primary">{{ selectedItem?.part }}</strong>
        <h2 class="blog-post-title mb-1">{{ selectedItem?.title }}</h2>
        <p class="blog-post-meta">{{ selectedItem?.create_at }} by {{ selectedItem?.nick_name }}</p>

        
        <p class="blog-post-content"> {{ selectedItem?.content }}</p>
        <!-- <div id="viewer" class="markdown-content" v-if="selectedItem?.content != null"></div> -->

    </article>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import { Viewer } from '@toast-ui/editor'; // 수정된 import 문
import Editor from '@toast-ui/editor';

export default defineComponent({
    name: 'RecordDetail',
    setup() {
        const route = useRoute();
        const store = useStore();
        const recordId = computed(() => route.params.id);
        const selectedItem = computed(() => store.state.records.records);

        // const viewer = ref<Viewer>(); // Viewer 타입으로 변경

        onMounted(() => {
            // const viewerElement = document.querySelector('#viewer') as HTMLElement;
            // viewer.value = Editor.factory({ // Viewer.factory()로 변경
            //     el: viewerElement,
            //     viewer: true,
            //     height: '500px',
            //     initialValue: '# hello'
            // });

            getRecord(Number(recordId.value));
        });
        const getRecord = (id: number) => {
            store.dispatch('getRecord', id).then(() => {
                // if (viewer.value) {
                //     viewer.value.setMarkdown(selectedItem.value?.content);
                // }
            });
        };

        return {
            selectedItem,
            // viewer
        };
    },
});
</script>
  