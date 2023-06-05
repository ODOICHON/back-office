<template>
    <div class="col-md-4" id="side-var">
        <div class="position-sticky" style="top: 2rem;">
            <!-- 카테고리 키워드 리스트 -->
            <div class="p-4">
                <h4 class="fst-italic">Category</h4>
                <ol class="list-unstyled mb-0">
                    <li><router-link :to="`/`" @click="getRecordList(parts[0])">{{ parts[0].toUpperCase() }}</router-link></li>
                    <li><router-link :to="`/`" @click="getRecordList(parts[1])">{{ parts[1].toUpperCase() }}</router-link></li>
                    <li><router-link :to="`/`" @click="getRecordList(parts[2])">{{ parts[2].toUpperCase() }}</router-link></li>
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
import { RecordData, RecordHotType, RecordReqParam } from '@/types/RecordType';

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
    const parts = ['web', 'server', 'infra'];

    const getRecordList = (part: string) => {
        console.log(part);
        const reqParam : RecordReqParam = { // To-Do 동적으로 요청 param 바뀌도록
        page: 0,
        part : part,
        type: 'tech',
        category: 'disaster' // 이거 어떻게 처리할지 고민
      };
        store.dispatch('getRecordList', reqParam);
    }

    const getRecord = (id: number) => {
        store.dispatch('getRecord', id);
    };


    return {
        getRecord,
        getRecordList,
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