<template>
    <div class="col mb-2" id="container">
        <div class="nav-scroller py-1 mb-2">
            <!-- 필터 적용 -->
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeFilter === 'mine' }" @click="setActiveFilter('mine')">내가 작성한 글</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeFilter === 'reviewed' }"
                        @click="setActiveFilter('reviewed')">내가 리뷰한 글(승인)</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeFilter === 'wait' }" @click="setActiveFilter('wait')">내가
                        리뷰해야 하는 글(대기)</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :class="{ active: activeFilter === 'apply' }" @click="setActiveFilter('apply')">내가
                        리뷰 신청한 글(대기)</a>
                </li>
            </ul>
        </div>
        <!-- 필터에 따른 게시글 데이터 리스트 -->
        <div v-if="activeFilter != 'wait' && activeFilter != 'apply'">
            <label for="approve">승인</label>
            <input type="radio" id="approve" value="approve" v-model="selectedFilter" @change="fetchData(1)">
            
            <label for="reject">반려</label>
            <input type="radio" id="reject" value="reject" v-model="selectedFilter" @change="fetchData(1)">
        </div>
        <record-list :records="records"></record-list>

    </div>
</template>

<script lang="ts">
import { authComputed } from '@/store/helper'
import RecordList from './RecordList.vue'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
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
        const records = ref([]);
        const page = computed(() => store.state.records.page);
        const currentFilter = computed(() => store.state.records.myPageFilter);
        const selectedFilter = ref('approve');
        const changedPage = ref(0);

        const fetchData = (page: number) => {
            const reqParam = {
                page : page - 1,
                status: selectedFilter.value,
            };
            if (filters.includes(currentFilter.value)) { // 필터링 배열에 포함된 필터일 경우
                store.dispatch(currentFilter.value, reqParam); // 해당 필터로 데이터 조회
            }
        };
        onMounted(() => {
            // 페이지가 렌더링 될 경우, 내가 작성한 게시글 노출
           activeFilter.value = 'mine';
        });

        const activeFilter = ref('mine'); // 선택된 필터를 저장하는 데이터 속성

        const setActiveFilter = (filter: string) => {
            activeFilter.value = filter;

            if (filter === 'mine') {
                store.dispatch('getRecordListMine', { page: 0, status: 'approve'});
            } else if (filter === 'reviewed') {
                store.dispatch('getRecordListOthers', { page: 0, status: 'approve'});
            } else if (filter === 'wait') {
                store.dispatch('getRecordListOthers', { page: 0, status: 'wait'});
            } else if (filter === 'apply') {
                store.dispatch('getRecordListMine', { page: 0, status: 'wait'});
            }
            selectedFilter.value = 'approve';
        };
        // 자식 컴포넌트의 changedPage 데이터를 감시
        let watchPage = watch(() => {
        return changedPage.value
        }, (newValue, oldValue) => {
        console.log('Counter changed:', newValue)
        fetchData(newValue);
        });
        
        watchEffect(() => {
            records.value = store.state.records.contents
        });
        return {
            records,
            page,
            fetchData,
            activeFilter,
            setActiveFilter,
            selectedFilter,
        }
    }
}
</script>

<style scoped>
#container {
    margin-right: 100px;
}
</style>