<template>
    <div class="col mb-2" id="board-container">
        <!-- 게시글 카드 4개씩 페이지네이션  -->
        <div class="col-md-10 text-start">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-primary">이거는 태그?</strong>
                    <h3 class="mb-0">게시물 제목!</h3>
                    <div class="mb-1 text-body-secondary">게시글 작성 일자 ( 05.11.2023 )</div>
                    <p class="card-text mb-auto">게시글 내용 미리보기 문구를 보여주자</p>
                    <a href="#" class="stretched-link">자세히보기</a>
                </div>

            </div>
        </div>
        <div class="col-md-10 text-start">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-primary">이거는 태그?</strong>
                    <h3 class="mb-0">게시물 제목!</h3>
                    <div class="mb-1 text-body-secondary">게시글 작성 일자 ( 05.11.2023 )</div>
                    <p class="card-text mb-auto">게시글 내용 미리보기 문구를 보여주자</p>
                    <a href="#" class="stretched-link">자세히보기</a>
                </div>
            </div>
        </div>
        <div class="col-md-10 text-start">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-primary">이거는 태그?</strong>
                    <h3 class="mb-0">게시물 제목!</h3>
                    <div class="mb-1 text-body-secondary">게시글 작성 일자 ( 05.11.2023 )</div>
                    <p class="card-text mb-auto">게시글 내용 미리보기 문구를 보여주자</p>
                    <a href="#" class="stretched-link">자세히보기</a>
                </div>
            </div>
        </div>
        <div class="col-md-10 text-start">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-primary">이거는 태그?</strong>
                    <h3 class="mb-0">게시물 제목!</h3>
                    <div class="mb-1 text-body-secondary">게시글 작성 일자 ( 05.11.2023 )</div>
                    <p class="card-text mb-auto">게시글 내용 미리보기 문구를 보여주자</p>
                    <a href="#" class="stretched-link">자세히보기</a>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class BoardList extends Vue {

}
</script>

<style scoped>
#board-container {
    margin-left: 100px;
}

</style>