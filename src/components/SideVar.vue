<template>
    <div class="col-md-4" id="side-var">
        <div class="position-sticky" style="top: 2rem;">
            <!-- 카테고리 키워드 리스트 -->
            <div class="p-4">
                <h4 class="fst-italic">Category</h4>
                <ol class="list-unstyled mb-0">
                    <li><router-link :to="`/`" @click="getHotRecordList(parts[0])">{{ parts[0] }}</router-link></li>
                    <li><router-link :to="`/`" @click="getHotRecordList(parts[1])">{{ parts[1] }}</router-link></li>
                    <li><router-link :to="`/`" @click="getHotRecordList(parts[2])">{{ parts[2] }}</router-link></li>
                </ol>
            </div>
            <!-- 금주의 인기 게시물 리스트 ( TOP 3 ) -->
            <div class="p-4">
                <h4 class="fst-italic">HOT POSTS</h4>
                <ol class="list-unstyled" v-for="record, idx in hotRecords" :key="record.record_id">
                    <li><router-link :to="`/records/${record.record_id}`" @click="getRecord(record.record_id)" v-if="idx < 3">{{ record.title }}</router-link></li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { useStore } from 'vuex';
import { computed, onMounted, PropType, ref } from 'vue';
import { RecordData, RecordHotType } from '@/types/RecordType';

export default {
    name: 'SideVar',
    props: {
        hotRecords: {
        required: true,
        type: Array as PropType<RecordHotType[]> ,
    },
    },
    setup() {
    const store = useStore();
    const parts = ['WEB', 'SERVER', 'INFRA'];

    const getRecord = (id: number) => {
        store.dispatch('getRecord', id);
    };


    return {
        getRecord,
        parts,
    }
  }
}
</script>

<style scoped>
#side-var{
    margin-left: 100px;
    text-align: left;
}
a {
  text-decoration-line: none;
  color : black;
}
</style>