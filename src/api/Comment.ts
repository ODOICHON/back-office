import { CommentCreateResponse, CommentReq } from "@/types/Comment";
import { AxiosPromise } from "axios";
import { restApi } from "./AxiosService";
import { API_URLS } from "@/constants/config";
import { ApplicationResponse } from "@/types/Common";

export function createComment(req: CommentReq, headers: { [key: string]: string }) : AxiosPromise<CommentCreateResponse> {
    return restApi.post(`${API_URLS.comment}`, req, { headers });
}

export function deleteComment(commentId: number, headers: { [key: string]: string }) : AxiosPromise<ApplicationResponse> {
    return restApi.delete(`${API_URLS.comment}/${commentId}`, {headers});
}