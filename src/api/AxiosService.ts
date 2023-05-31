import store from '@/store';
import axios, { AxiosError, AxiosPromise } from 'axios';

// REST API 통신을 위한 axios 객체 선언 및 초기화
export const restApi = axios.create({
    baseURL: process.env.BASE_URL, // /api로 시작하면 BASE_URL로 포워딩 되도록 proxy 등록.
    timeout: 50000
})
restApi.defaults.withCredentials = true; // 쿠키 자동 등록 설정

export interface ErrorResponse {
    code: string;
    message: string;
}

// 401 에러 처리를 위한 axios 인터셉터
let refresh = false;
restApi.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {

        if (error.response?.status === 401 && !refresh) {
            try {
                const data = error.response.data as ErrorResponse;
                if (data.code === 'J0002') { // 토큰 만료
                    refresh = true;
                    const token = localStorage.getItem('user')?.split(" ")[1];
                    store.dispatch('reissue', token);

                } else if (data.code === 'J0004') { // 잘못된 토큰
                }
            } catch {
                store.dispatch('logout');
            }

        }
        refresh = false;
        return Promise.reject(error);
    }
);