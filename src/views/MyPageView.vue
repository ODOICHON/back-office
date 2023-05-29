<template>
    <div class="row g-1" id="container">
        <profile></profile>
        <record-nav></record-nav>
    </div>
</template>

<script lang="ts">
import Profile from '@/components/Profile.vue'
import RecordList from '@/components/RecordList.vue'
import RecordNav from '@/components/RecordNav.vue'
import store from '@/store'
export default {
  components: { RecordList, RecordNav, Profile },
    setup () {

    return {}
    }
}
</script>

<style lang="scss" scoped>

</style>