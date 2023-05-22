import { BoardResponse, BoardPageResponse } from "@/types/BoardType";
import { AxiosPromise } from "axios";
import { restApi } from "./AxiosService";

// 게시글 단일 조회
export function getBoard(id: number) : AxiosPromise<BoardResponse> {
    return restApi.get(`/api/v1/boards/${id}`);
}

// 게시글 리스트 조회
export function getBoards(page : number) : AxiosPromise<BoardPageResponse> {
    return restApi.get(`/api/v1/boards?prefix=INTRO&size=4&page=${page}`);
}

// 게시글 검색 조회
export function getBoardsWithCategory(name : string) : AxiosPromise<BoardPageResponse> {
    return restApi.get(`/api/v1/boards?prefix=${name}&search=`);
}