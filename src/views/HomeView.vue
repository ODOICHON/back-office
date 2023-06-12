<template>
  <div class="row" id="container">
    <record-list :records="records"></record-list>
    <side-var :hotRecords="hotRecords"></side-var>
  </div>
</template>

<script lang="ts">
import RecordList from '@/components/RecordList.vue'
import SideVar from '@/components/SideVar.vue'
import { onMounted, PropType, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router'
import { authComputed } from '@/store/helper'
import { RecordReqParam } from '@/types/RecordType'

export default {
  name: 'HomeView',
  components: {
    RecordList,
    SideVar
  },
  computed: {
        ...authComputed,
  },
  setup() {
    const store = useStore(); // store 객체 사용을 위해 선언
    const router = useRouter();

    const records = computed(() => store.state.records.contents); // 게시물 리스트 세팅
    const hotRecords = computed(() => store.state.records.hotRecords); // 금주의 핫 게시물 데이터 세팅

    const getHotRecordList = () => {
        store.dispatch('getHotRecordList');
    };

    // 페이지 렌더링 시, 실행되는 함수
    onMounted(() => {
      getHotRecordList();
    });

    return {
      records,
      hotRecords
    };

  },
}

</script>

<style scoped>
#page-conatiner {
  margin-bottom: 20px;
}

#container {
  margin-left: 100px;
  margin-right: 100px;
  height: 100%;
}
</style>