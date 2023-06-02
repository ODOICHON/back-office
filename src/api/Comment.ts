import { CommentCreateResponse, CommentReq } from "@/types/Comment";
import { AxiosPromise } from "axios";
import { restApi } from "./AxiosService";
import { API_URLS } from "@/constants/config";

export function createComment(req: CommentReq, headers: { [key: string]: string }) : AxiosPromise<CommentCreateResponse> {
    return restApi.post(`${API_URLS.comment}`, req, { headers });
}