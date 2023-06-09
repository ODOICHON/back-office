<template>
    <article class="blog-post">
        <div class="btn-container text-end" v-if="loggedIn">
            <button class="btn" @click="moveToUpdate(selectedItem.record_id)">수정</button> <button class="btn btn-danger"
                @click="deleteItem(selectedItem.record_id)">삭제</button>
        </div>
        <p class="blog-post-meta">{{ selectedItem?.create_at }} by {{ selectedItem?.nick_name }} </p>
        <h2 class="blog-post-title mb-1">{{ selectedItem?.title }} </h2>

        <div id="viewer" class="overflow-hidden flex-md-row mb-4 h-md-250 position-relative"> </div>
    </article>

    <div id="review-comment-container">
        <div class="card bg-light">
            <div class="card-body">
                <div class="mb-4" v-for="review in selectedItem.reviews" :key="review.review_id">
                    <div class="fw-bold">{{ review.create_at }} by {{ review.nick_name }} <strong
                class="d-inline-block mb-2 text-primary"> {{ review.status == 'approve' ? '승인' : '반려' }}</strong></div>
                    {{ review.content }}
                </div>
            </div>
        </div>
    </div>

    <div id="review-container" class="mb-3" v-if="currentUser != '' && currentUser.nick_name != selectedItem?.nick_name">
        <label for="content" class="form-label"></label>
        <textarea class="form-control" id="content" rows="3" v-model="content"></textarea>
        <div class="btn-container text-end">
            <button class="btn btn-warning" @click="saveReview(selectedItem.record_id, 'reject')">리뷰 반려</button> <button class="btn btn-primary"
                @click="saveReview(selectedItem.record_id, 'approve')">리뷰 승인</button>
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
import Comment from './Comment.vue';

export default defineComponent({
    name: 'RecordDetail',
    components: {
        viewer: document.querySelector('#viewer') as HTMLElement,
        Comment,
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
        const selectedItem = computed(() => store.state.review.review);
        const content = ref('');

        onMounted(() => {
            getReview(Number(recordId.value));
        });
        const getReview = (id: number) => {
            store.dispatch('getReview', id).then(() => {
                const v = EditorCore.factory({
                    el: document.querySelector('#viewer') as HTMLElement,
                    initialValue: selectedItem.value.content,
                    viewer: true,
                }) as Viewer
            });
        };
        const moveToUpdate = (id: number) => {
            const result = confirm('게시글을 수정하시겠습니까?');
            if(result) {
                router.push({
                    path: `/records/update/${id}`
                });
            }
        };
        const deleteItem = (id: number) => {
            const result = confirm('게시글을 삭제하시겠습니까? 삭제된 게시글은 되돌릴 수 없습니다.');
            if(result) {
                store.dispatch('deleteRecord', id).then(() => {
                router.push('/');
            });
            }
        };
        const saveReview = (id: number, status : string) => {
            const result = confirm('리뷰를 등록하시겠습니까?');
            if(result) {
                if(content.value.length >= 1) {
                    const reviewReq : ReviewReq = {
                    record_id : id,
                    content: content.value,
                    status : status
                }
                store.dispatch('saveReview', reviewReq).then(() => {
                    store.dispatch('getReview', id).then(() => router.push(`/reviews/${id}`));
                });
                } else {
                    alert('리뷰 내용은 1자 이상 작성하셔야 합니다.');
                }
            }
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
#review-container,
#review-comment-container {
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
  