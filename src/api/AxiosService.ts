import { BoardPageResponse, BoardResponse } from '@/types/BoardType';
import axios, { AxiosPromise } from 'axios';

// REST API 통신을 위한 axios 객체 선언 및 초기화
const restApi = axios.create({
    baseURL : process.env.BASE_URL, // /api로 시작하면 BASE_URL로 포워딩 되도록 proxy 등록.
    timeout: 50000
})

// 게시글 단일 조회
export function getBoards(id: number) : AxiosPromise<BoardResponse> {
    return restApi.get(`/api/v1/boards/${id}`);
}

// 게시글 리스트 조회
export function fetchBoards(page : number) : AxiosPromise<BoardPageResponse> {
    return restApi.get(`/api/v1/boards?category=INTRO&size=4&page=${page}`);
}