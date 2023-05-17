<template>
  <div class="app">
    <base-header></base-header>
    <router-view />
    <base-footer></base-footer>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import BaseHeader from '@/components/Header.vue'
import BaseFooter from './components/Footer.vue';
export default {
  components : {
    BaseHeader,
    BaseFooter
  }
}
</script>

<style lang="stylus">

</style>