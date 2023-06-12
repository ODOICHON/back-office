<template>
    <div class="col mb-2" id="container">
        <div class="nav-scroller py-1 mb-2">
            <!-- 필터 적용 -->
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeFilter === 'mine' }" @click="setActiveFilter('mine')">내가 작성한 글</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeFilter === 'reviewed' }" @click="setActiveFilter('reviewed')">내가 리뷰한 글</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeFilter === 'wait' }" @click="setActiveFilter('wait')">리뷰 대기 글</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeFilter === 'apply' }" @click="setActiveFilter('apply')">리뷰 신청 글</a>
                </li>
            </ul>
        </div>
        <!-- 필터에 따른 게시글 데이터 리스트 -->
        <record-list :records="records"></record-list>
        
    </div>
</template>

<script lang="ts">
import { authComputed } from '@/store/helper'
import RecordList from './RecordList.vue'
import { computed, onMounted, ref } from 'vue'
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
            const pageNum = page - 1;
            if (filters.includes(currentFilter.value)) { // 필터링 배열에 포함된 필터일 경우
                store.dispatch(currentFilter.value, pageNum); // 해당 필터로 데이터 조회
            }
        };
        onMounted(() => {
            // 페이지가 렌더링 될 경우, 내가 작성한 게시글 노출
            store.dispatch('getRecordListMine', 0);
        });

        const activeFilter = ref('mine'); // 선택된 필터를 저장하는 데이터 속성

        const setActiveFilter = (filter: string) => {
            activeFilter.value = filter;

            if(filter === 'mine') {
                store.dispatch('getRecordListMine', 0);
            } else if(filter === 'reviewed') {
                store.dispatch('getRecordListReviewed', 0);
            } else if(filter === 'wait') {
                store.dispatch('getRecordListWait', 0);
            } else if(filter === 'apply') {
                store.dispatch('getRecordListApply', 0);
            }
        };

        return {
            records,
            page,
            fetchData,
            activeFilter,
            setActiveFilter,
        }
    }
}
</script>

<style scoped>
#container {
    margin-right: 100px;
}


</style>