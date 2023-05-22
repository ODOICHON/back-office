import { BoardResponse, BoardPageResponse } from "@/types/BoardType";
import { AxiosPromise } from "axios";
import { restApi } from "./AxiosService";
import { API_URLS_BORAD } from "@/constants/config";

// 게시글 단일 조회
export function getBoard(id: number) : AxiosPromise<BoardResponse> {
    return restApi.get(`${API_URLS_BORAD}/${id}`);
}

// 게시글 리스트 조회
export function getBoards(page : number) : AxiosPromise<BoardPageResponse> {
    return restApi.get(`${API_URLS_BORAD}?prefix=INTRO&size=4&page=${page}`);
}

// 게시글 검색 조회
export function getBoardsWithCategory(name : string) : AxiosPromise<BoardPageResponse> {
    return restApi.get(`${API_URLS_BORAD}?prefix=${name}&search=`);
}