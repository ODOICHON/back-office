<template>
  <nav>
    <router-link to="/tech">Home</router-link> |
    <router-link to="/tech/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
