<template>
    <article class="blog-post">
        <div class="btn-container text-end" v-if="loggedIn">
            <button class="btn" @click="moveToUpdate(selectedItem.record_id)">수정</button> <button class="btn btn-danger"
                @click="deleteItem(selectedItem.record_id)">삭제</button>
        </div>
        <p class="blog-post-meta">{{ selectedItem?.create_at }} by {{ selectedItem?.nick_name }} <strong
                class="d-inline-block mb-2 text-primary"> {{ selectedItem?.part }}</strong></p>
        <h2 class="blog-post-title mb-1">{{ selectedItem?.title }}</h2>

        <div id="viewer" class="overflow-hidden flex-md-row mb-4 h-md-250 position-relative"> </div>
    </article>

    <div class="mb-3" v-if="currentUser != selectedItem?.nick_name">
        <label for="content" class="form-label"></label>
        <textarea class="form-control" id="content" rows="3" v-model="content"></textarea>
        <div class="btn-container text-end">
            <button class="btn btn-warning" @click="saveReview(selectedItem.record_id, 'approve')">리뷰 반려</button> <button class="btn btn-primary"
                @click="saveReview(selectedItem.record_id, 'reject')">리뷰 승인</button>
        </div>
    </div>
   
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import { Editor, EditorCore, Viewer } from '@toast-ui/editor'; // 수정된 import 문
import { authComputed, getCurrentUser } from '@/store/helper';
import { ReviewReq } from '@/types/ReviewType';

export default defineComponent({
    name: 'RecordDetail',
    components: {
        viewer: document.querySelector('#viewer') as HTMLElement,
    },
    computed: {
        ...getCurrentUser,
        ...authComputed
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const recordId = computed(() => route.params.id);
        const selectedItem = computed(() => store.state.records.records);
        const content = ref('');

        onMounted(() => {
            getRecord(Number(recordId.value));
        });
        const getRecord = (id: number) => {
            store.dispatch('getRecord', id).then(() => {
                const v = EditorCore.factory({
                    el: document.querySelector('#viewer') as HTMLElement,
                    initialValue: selectedItem.value.content,
                    viewer: true,
                }) as Viewer
            });
        };
        const moveToUpdate = (id: number) => {
            router.push({
                path: `/records/update/${id}`
            });
        };
        const deleteItem = (id: number) => {
            store.dispatch('deleteRecord', id).then(() => {
                router.push('/');
            });
        };
        const saveReview = (id: number, status : string) => {
            const reviewReq : ReviewReq = {
                record_id : id,
                content: content.value,
                status : status
            }
            store.dispatch('saveReview', reviewReq);
        }
        return {
            selectedItem,
            content,
            moveToUpdate,
            deleteItem,
            saveReview
        };
    },

});
</script>
  
<style scoped>
article,
#exampleFormControlTextarea1 {
    padding-left: 70px;
    padding-right: 70px;
    margin-bottom: 40px;
    margin-top: 40px;
    /* height: 500px; */
}

#exampleFormControlTextarea1 {
    padding-left: 70px;
    padding-right: 70px;
    margin-bottom: 40px;
    margin-top: 40px;
    /* height: 500px; */
}</style>
  