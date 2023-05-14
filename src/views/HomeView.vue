<template>
  <div class="row g-5">
    <board-list></board-list>
    <side-var></side-var>
    <!-- TO-DO 페이지네이션으로 페이지 수 받아오면 v-for로 리펙토링 -->
    <div class="page-conatiner">
        <a href="#" class="stretched-link">1</a>  
        <sapn>  2   </sapn>
        <sapn>  3   </sapn>
        <sapn>  4   </sapn>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BoardList from '@/components/BoardList.vue'
import SideVar from '@/components/SideVar.vue'

@Options({
  components: {
    BoardList,
    SideVar
  }
})
export default class HomeView extends Vue {

}
</script>

<style scoped>
.page-conatiner {
    margin-bottom: 20px;
}

</style>