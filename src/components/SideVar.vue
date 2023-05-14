<template>
    <div class="col-md-4" id="side-var">
        <div class="position-sticky" style="top: 2rem;">
            <!-- 카테고리 키워드 리스트 -->
            <div class="p-4">
                <h4 class="fst-italic">Category</h4>
                <ol class="list-unstyled mb-0">
                    <li><a href="#">WEB</a></li>
                    <li><a href="#">SERVER</a></li>
                    <li><a href="#">INFRA</a></li>
                </ol>
            </div>
            <!-- 금주의 인기 게시물 리스트 ( TOP 3 ) -->
            <div class="p-4">
                <h4 class="fst-italic">HOT POSTS</h4>
                <ol class="list-unstyled">
                    <li><a href="#">게시글#1</a></li>
                    <li><a href="#">게시글#2</a></li>
                    <li><a href="#">게시글#3</a></li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class SideVar extends Vue{

}
</script>

<style scoped>
#side-var{
    margin-right: 100px;
    text-align: left;
}
</style>