import { API_URLS } from "@/constants/config";
import { LoginReq, UserResponse } from "@/types/UserType";
import { AxiosPromise } from "axios";
import { restApi } from "./AxiosService";
import { ApplicationResponse } from "@/types/Common";

// 사용자 로그인
export function login(loginReq: LoginReq) : AxiosPromise<UserResponse> {
    return restApi.post(`${API_URLS.user}/sign-in`, loginReq);
}

// 사용자 로그아웃
interface Headers {
    [key: string]: string;
  }
export function logout(headers : Headers) : AxiosPromise<ApplicationResponse> {
    return restApi.post(`${API_URLS.user}/logout`, null, {headers});
}