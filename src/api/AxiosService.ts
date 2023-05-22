import axios, { AxiosPromise } from 'axios';

// REST API 통신을 위한 axios 객체 선언 및 초기화
export const restApi = axios.create({
    baseURL : process.env.BASE_URL, // /api로 시작하면 BASE_URL로 포워딩 되도록 proxy 등록.
    timeout: 50000
})
