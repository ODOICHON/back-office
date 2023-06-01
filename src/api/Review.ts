import { ReviewReq, ReviewResponse } from "@/types/ReviewType";
import { AxiosPromise } from "axios";
import { restApi } from "./AxiosService";
import { API_URLS } from "@/constants/config";

export function saveReview(reviewReq: ReviewReq,  headers: { [key: string]: string }) : AxiosPromise<ReviewResponse> {
    return restApi.post(`${API_URLS.review}`, reviewReq, {headers});
}