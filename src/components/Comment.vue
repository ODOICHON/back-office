<template>
  <div id="container">
    <div class="card bg-light">
      <div class="card-body">
        <!-- 부모 댓글 작성 폼 -->
        <form class="mb-4" @submit="handleSubmit">
          <label for="commentContent" class="form-label"></label>
          <textarea class="form-control" rows="3" id="commentContent" placeholder="로그인 후, 댓글을 남겨보세요!" v-model="commentContent"></textarea>
          <div class="btn-container text-end" style="margin-top: 10px;">
            <button class="btn" type="submit">등록</button>
          </div>
        </form>
        <!-- 댓글 컴포넌트 시작 -->
        <div class="mb-4" v-for="comment in comments" :key="comment.comment_id">
          <!-- 부모 컴포넌트 -->
          <div v-if="comment.level === 1">
            <div class="ms-3">
              <div class="fw-bold">{{ comment.create_at }} | {{ comment.nick_name }} <button type="button" class="btn btn-danger" @click="deleteComment(comment.comment_id)" v-if="currentUser != '' && currentUser == comment.nick_name && !comment.content.startsWith('삭제된')">삭제</button></div>
              {{ comment.content }}
              <!-- 답글 컴포넌트 -->
              <div class="d-flex mt-4" v-for="reply in filteredReplies" :key="reply.level">
                <div class="ms-3" v-if="comment.comment_id < reply.comment_id">
                  <div class="fw-bold">{{ reply.create_at }} | {{ reply.nick_name }} <button type="button" class="btn btn-danger" @click="deleteComment(comment.comment_id)" v-if="currentUser != '' && currentUser == comment.nick_name">삭제</button></div>
                  {{ reply.content }}
                </div>
              </div>
              <!-- 답글 작성 폼 -->
              <!-- <form class="mb-4" @submit="handleReplySubmit(comment.comment_id)">
                <label for="replyContent" class="form-label"></label>
                <textarea class="form-control" rows="3" id="replyContent" placeholder="답글을 남겨주세요." v-model="replyContent"></textarea>
                <div class="btn-container text-end" style="margin-top: 10px;">
                  <button class="btn" type="submit">답글 달기</button>
                </div>
              </form> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CommentReq, CommentType } from '@/types/Comment'
import { computed, onMounted, PropType, ref } from 'vue'
import store from '@/store'
import router from '@/router'
import { getCurrentUser, authComputed } from '@/store/helper'

export default {
    name: 'Comment',
    props: {
        comments: {
            required: true,
            type: Array as PropType<CommentType[]>,
            default: []
        },
        record_id: {
            required: true,
            type: Number,
            default: 0,
        }
    },
    computed: {
        ...getCurrentUser,
        ...authComputed,
    },
    setup(props: any) {
        const parent_id = ref(0); // 답글의 부모 댓글 ID를 저장하는 변수
        const replyContent = ref(''); // 답글 내용을 저장하는 변수
        const commentContent = ref('');
        const filteredReplies = computed(() => props.comments.filter((reply: CommentType) => reply.level >= 2));

        const handleSubmit = () => {
          const result = confirm('댓글을 등록하시겠습니까?');
          if(result) {
            const commentReq: CommentReq = {
                record_id: props.record_id,
                parent_id: null,
                content: commentContent.value
            };
            store.dispatch('createComment', commentReq).catch(() => { commentContent.value = '';});
          }
        };

        const handleReplySubmit = (parentId: number) => {
            parent_id.value = parentId; // 답글의 부모 댓글 ID 설정

            const commentReq: CommentReq = {
                record_id: props.record_id,
                parent_id: parent_id.value,
                content: replyContent.value,
            };

            store.dispatch('createComment', commentReq).catch(() => { replyContent.value = '';});
        };

        const deleteComment = (commentId : number) => { 
          const result = confirm('댓글을 삭제하시겠습니까? 삭제 시, 내용만 삭제됩니다.');
          if(result) {
            store.dispatch('deleteComment', commentId);
          }
        };

        return {
            parent_id,
            replyContent,
            commentContent,
            handleSubmit,
            handleReplySubmit,
            deleteComment,
            filteredReplies,
        }
    }
}
</script>

<style scoped>
#container {
    padding-left: 70px;
    padding-right: 70px;
    margin-bottom: 40px;
    margin-top: 40px;
}
</style>