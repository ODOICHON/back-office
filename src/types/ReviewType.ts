export interface ReviewReq {
    record_id : number;
    content: string;
    status : string;
}

export interface ReviewResponse {
    code: string;
    message : string;
    data : number;
}