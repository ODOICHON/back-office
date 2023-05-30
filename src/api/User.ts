import { API_URLS } from "@/constants/config";
import { LoginReq, UserResponse } from "@/types/UserType";
import { AxiosPromise } from "axios";
import { restApi } from "./AxiosService";
import { ApplicationResponse } from "@/types/Common";

// 사용자 로그인
export function login(loginReq: LoginReq) : AxiosPromise<UserResponse> {
    return restApi.post(`${API_URLS.user}/sign-in`, loginReq, {withCredentials:true});
}

// 사용자 로그아웃
interface Headers {
    [key: string]: string;
  }
export function logout(headers : Headers) : AxiosPromise<ApplicationResponse> {
    return restApi.post(`${API_URLS.user}/logout`, null, {headers});
}

// 토큰 재발급
export function reissue(access_token : string) : AxiosPromise<UserResponse>{
    return restApi.post(`${API_URLS.user}/reissue`, {access_token : access_token}, {withCredentials:true});
}