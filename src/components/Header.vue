<template>
    <header>
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
        <router-view />
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Vue } from 'vue-class-component'

export default class BaseHeader extends Vue{

}
</script>

<style scoped></style>