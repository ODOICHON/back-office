<template>
    <div class="col mb-2" id="container">
        <div class="nav-scroller py-1 mb-2">
            <!-- 필터 적용 -->
            <nav class="nav d-flex justify-content-between">
                <a class="p-2 link-secondary" @click="getRecordListMine">내가 작성한 글</a>
                <a class="p-2 link-secondary" @click="getRecordListReviewed">내가 리뷰한 글</a>
                <a class="p-2 link-secondary" @click="getRecordListWait">리뷰 신청 대기 글</a>
                <a class="p-2 link-secondary" @click="getRecordListApply">리뷰 신청 글</a>
            </nav>
        </div>
        <!-- 필터에 따른 게시글 데이터 리스트 -->
        <record-list :records="records"></record-list>
        <!-- 필터에 따른 게시글 데이터 리스트 페이징 처리 -->
        <nav aria-label="Page navigation example" class="col-md-6">
            <ul class="pagination justify-content-center">
                <li class="page-item" v-for="idx in page" :key="idx"><a class="page-link" @click="fetchData(Number(idx))">{{
                    idx
                }}</a></li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
import { authComputed } from '@/store/helper'
import RecordList from './RecordList.vue'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { RecordReqParam } from '@/types/RecordType'
import { filters } from '@/constants/myPageFilter'
export default {
    components: { RecordList },
    computed: {
        ...authComputed,
    },
    setup() {
        const store = useStore();
        const records = computed(() => store.state.records.myRecords);
        const page = computed(() => store.state.records.page);
        const currentFilter = computed(() => store.state.records.myPageFilter);

        const fetchData = (page: number) => {
            const pageNum = page -1;
            if (filters.includes(currentFilter.value)) { // 필터링 배열에 포함된 필터일 경우
                store.dispatch(currentFilter.value, pageNum); // 해당 필터로 데이터 조회
            }           
        };
        onMounted(() => { 
            // 페이지가 렌더링 될 경우, 내가 작성한 게시글 노출
            store.dispatch('getRecordListMine', 0);
        });

        const getRecordListMine = () => {
            // alert('내가 작성한 게시글을 선택하셨습니다!');
            store.dispatch('getRecordListMine', 0);
        };
        const getRecordListReviewed = () => {
            // alert('내가 리뷰한 게시글을 선택하셨습니다!');
            store.dispatch('getRecordListReviewed', 0);
        };
        const getRecordListWait = () => {
            // alert('리뷰 신청 대기 게시글을 선택하셨습니다!');
            store.dispatch('getRecordListWait', 0);
        };
        const getRecordListApply = () => {
            // alert('내가 리뷰 신청한 게시글을 선택하셨습니다!');
            store.dispatch('getRecordListApply', 0);
        };
        return {
            records,
            page,
            fetchData,
            getRecordListMine,
            getRecordListReviewed,
            getRecordListWait,
            getRecordListApply
        }
    }
}
</script>

<style scoped>
#container {
    margin-right: 100px;
}
</style>