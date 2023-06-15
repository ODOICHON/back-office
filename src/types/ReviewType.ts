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
export interface ReviewRecordResponse {
    code: string;
    message: string;
    data : ReviewRecordType;
}
export interface ReviewRecordType {
    record_id: number;
    title: string;
    content: string;
    hits: number;
    part: string;
    nick_name: string;
    create_at: string;
    reviews: ReviewType[];
}

export interface ReviewType {
    review_id: number;
    content : string;
    status: string;
    nick_name: string;
    create_at : string;
}