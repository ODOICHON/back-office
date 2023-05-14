<template>
  <div class="app">
    <base-header></base-header>
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
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>