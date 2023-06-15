<template>
    <div class="col mb-2" >
        <div class="container d-flex flex-column justify-content-start min-vh-100" v-if="records.length !== 0">
        <!-- 게시글 카드 4개씩 페이지네이션  -->
        <div class="row-md-5 text-start" v-for="record, idx in records" :key="record.record_id">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
                v-if="idx < 4">
                <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-primary">{{ record.category }}</strong>
                    <h3 class="mb-0">{{ record.title }}</h3>
                    <div class="mb-1 text-body-secondary">{{ record.create_at }}</div>
                    <p class="card-text mb-auto">{{ record.nick_name }}</p>
                    <router-link :to="`/records/${record.record_id}`">자세히보기</router-link>
                    <router-link :to="`/reviews/${record.record_id}`" v-if="loggedIn && currentUser.authority === 'ADMIN'">리뷰 확인하기</router-link>
                </div>
            </div>
        </div>
        
    </div>
    <div class="container text-center d-flex flex-column justify-content-center min-vh-100" v-else >
        <p id="empty">아직 작성된 게시글이 없습니다.</p>
    </div>
    <nav aria-label="Page navigation example" class="col" v-if="records.length !== 0">
            <ul class="pagination justify-content-center">
                <li class="page-item" v-for="idx in page" :key="idx"><a class="page-link" @click="fetchData(Number(idx))">{{
                    idx
                }}</a></li>
            </ul>
        </nav>
    <div class="col text-end">
            <button type="button" class="btn btn-outline-secondary me-2" @click="createData()" v-if="loggedIn">글쓰기</button>
    </div>
    </div>
    
</template>

<script lang="ts">
import { computed, onMounted, PropType, ref } from 'vue';
import { useStore } from 'vuex';
import RecordType, { RecordReqParam } from '@/types/RecordType';
import router from '@/router';
import { authComputed, getCurrentUser } from '@/store/helper';

export default {
    name: 'RecordList',
    props: {
        records: {
            required: true,
            type: Array as PropType<RecordType[]>,
        }
    },
    computed: {
        ...authComputed,
        ...getCurrentUser,
    },
    setup() {
        const store = useStore();
        const totalPages = computed(() => store.state.records.totalPages);
        const page = computed(() => store.state.records.page);

        const createData = () => {
            router.push({
                path: "/records/write",
            });
        };


        // 게시글 리스트 조회 함수 정의
        const fetchData = (page: number) => {
            const reqParam: RecordReqParam = { // To-Do 동적으로 요청 param 바뀌도록
                page: page - 1,
                part: 'all',
                type: 'all',
                category: null
            };
            store.dispatch('getRecordList', reqParam);
        };
        
        onMounted(() => {
            fetchData(1);
        })
        return {
            totalPages,
            page,
            createData,
            fetchData,
        }
    }
}
</script>

<style scoped>
</style>