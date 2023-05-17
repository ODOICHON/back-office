<template>
    <header
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

        <div class="col-md-3 mb-2 mb-md-0" id="logo-btn">
            <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
                <img alt="logo-img" src="../assets/logo.svg">
            </a>
        </div>
        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><router-link to="/intro">오도리</router-link></li>
            <li><router-link to="/skill">기술적용</router-link></li>
            <li><router-link to="/review">회고</router-link></li>
        </ul>

        <div class="col-md-3 text-end" id="btn-container">
            <button type="button" class="btn btn-outline-primary me-2">마이페이지</button>
            <button type="button" class="btn btn-primary">로그아웃</button>
        </div>
    </header>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class BaseHeader extends Vue {

}
</script>

<style scoped>

li {
    padding: 10px;
}
#btn-container {
    margin-right:110px;
}
#logo-btn {
    margin-left: 110px;
}
</style>