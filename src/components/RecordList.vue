<template>
    <div class="col mb-2" v-if="records.length !==0">
        <!-- 게시글 카드 4개씩 페이지네이션  -->
        <div class="row-md-5 text-start" v-for="record, idx in records" :key="record.record_id">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" v-if="idx < 4">
                <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-primary">{{ record.category }}</strong>
                    <h3 class="mb-0">{{ record.title }}</h3>
                    <div class="mb-1 text-body-secondary">{{ record.create_at }}</div>
                    <p class="card-text mb-auto">{{ record.nick_name }}</p>
                    <router-link :to="`/records/${record.record_id}`" @click="getRecord(record.record_id)">자세히보기</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, ref } from 'vue';
import { useStore } from 'vuex';
import RecordType from '@/types/RecordType';

export default {
    name : 'RecordList',
    props: {
    records: {
        required: true,
        type: Array as PropType<RecordType[]> ,
    }
  }, setup() {
    const store = useStore();
    const getRecord = (id: number) => {
        store.dispatch('getRecord', id);
    };
    return {
        getRecord,
    }
  }
}
</script>

<style scoped>

</style>