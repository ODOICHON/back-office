<template>
    <header
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

        <div class="col-md-3 mb-2 mb-md-0" id="logo-btn">
            <router-link to="/" class="d-inline-flex link-body-emphasis text-decoration-none">
                <img alt="logo-img" src="../assets/logo.svg">
            </router-link>
        </div>
        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><router-link style=text-decoration:none;color:black; to="/odori">오도리</router-link></li>
            <li><router-link style=text-decoration:none;color:black; to="/tech">기술적용</router-link></li>
            <li><router-link style=text-decoration:none;color:black; to="/retro">회고</router-link></li>
        </ul>

        <div class="col-md-3 text-end" id="btn-container">
            <button type="button" class="btn btn-outline-primary me-2" v-if="loggedIn" @click="moveMypage">마이페이지</button>
            <button type="button" class="btn btn-primary" @click="moveLogin" v-if="!loggedIn">로그인</button>
            <button type="button" class="btn btn-primary" @click="moveLogOut" v-else>로그아웃</button>
        </div>
    </header>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { authComputed } from '@/store/helper';
import store from '@/store';

export default {
    computed: {
        ...authComputed,
    },
    setup() {
        const router = useRouter();

        const moveLogin = () => {
            router.push({
                path: '/login',
            });
        }
        const moveLogOut = () => {
            store.dispatch('logout').then(() => router.push({path: '/'}));
        }
        const moveMypage = () => {
            router.push({
                path: '/mypage',
            });
        }
        return {
            moveLogin,
            moveLogOut,
            moveMypage
        }
    },
}
</script>

<style scoped>

li {
    padding-left: 30px;
    padding-right: 30px;
}
#btn-container {
    margin-right:110px;
}
#logo-btn {
    margin-left: 110px;
}
</style>