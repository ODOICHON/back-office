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

<style>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>