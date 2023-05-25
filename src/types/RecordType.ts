interface RecordType { // 게시글 단일 조회 시 사용
    record_id: number;
    title: string;
    content: string;
    hits: number;
    part: string;
    type: string;
    category: string;
    nick_name: string;
    create_at: string;
    comments: Comment[];
}

export default RecordType

export interface RecordResponse { // 게시글 단일 변경 혹은 조회 시, 사용
    data: RecordType
}
export interface RecordCreateResponse { // 게시글 단일 변경 혹은 조회 시, 사용
    data: number;
}

export interface RecordPageResponse { // 게시글 페이징 처리 시, 사용
    data: RecordPageType;
}

export interface RecordPageType {
    records : Content;
}
export interface Content {
    content : RecordData[];
    totalPages : number;
    totalElements : number;
}
export interface RecordData {
    record_id: number;
    title: string;
    content: string;
    nick_name: string;
    create_at: string;
    part: string;
}

export interface RecordCreateReq { // 게시글 생성 시, 보내는 요청 DTO
    title: string;
    content: string;
    part : string;
    category : string;
    type: string;
}

export interface RecordHotResponse {
    data : RecordHotData;
}

export interface RecordHotData {
    records: RecordHotType[]
}

export interface RecordHotType {
    record_id: number;
    title: string;
}

export interface RecordReqParam {
    page : number;
    part : string;
    type: string;
    category: string;
}