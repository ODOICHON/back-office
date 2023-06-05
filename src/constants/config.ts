export const BASE_URL : string = 'https://duaily.net/api'; // 기본 요청 URL 정의

export const API_URLS = { // 도메인에 따른 key-value 정의
    record : `${BASE_URL}/v1/record`,
    user: `${BASE_URL}/v1/users`,
    review: `${BASE_URL}/v1/record_review`,
    comment: `${BASE_URL}/v1/record_comment`,
};
