import { RecordResponse, RecordPageResponse, RecordCreateReq, RecordCreateResponse, RecordHotResponse } from "@/types/RecordType";
import { AxiosPromise } from "axios";
import { restApi } from "./AxiosService";
import { API_URLS } from "@/constants/config";

// 게시글 단일 조회
export function getRecord(id: number) : AxiosPromise<RecordResponse> {
    return restApi.get(`${API_URLS.record}/${id}?page=0`);
}

// 게시글 리스트 조회
// api/v1/record/{part}/{type}?category=&page=
export function getRecordList(page : number, part: string, type : string, category : string) : AxiosPromise<RecordPageResponse> {
    return restApi.get(`${API_URLS.record}/${part}/${type}?category=${category}&page=${page}`);
}

// 금주의 핫 게시물 리스트 조회
export function getHotRecordList() : AxiosPromise<RecordHotResponse> {
    return restApi.get(`${API_URLS.record}/hot`);
}

// 게시글 생성
export function createRecord(recordReq : RecordCreateReq, headers: { [key: string]: string }) : AxiosPromise<RecordCreateResponse> {
    return restApi.post(`${API_URLS.record}`, recordReq, { headers });
}

// 게시글 수정
export function updateRecord(recordReq: RecordCreateReq, id : number) : AxiosPromise<number> {
    return restApi.put(`${API_URLS.record}/${id}`, recordReq);
}

// 게시글 삭제
export function deleteRecord(id: number) : AxiosPromise<RecordResponse> {
    return restApi.delete(`${API_URLS.record}/${id}`);
}