interface BoardType { // 게시글 단일 조회 시 사용
    boardId: number;
    title: string;
    code: string;
    nickName: string;
    createdAt: Date;
    imageUrls: string[];
    loveCount: number;
    category: string;
    prefixCategory: string;
    commentCount: number;
    comments: Comment[];
}

export default BoardType

export interface BoardResponse { // 게시글 단일 변경 혹은 조회 시, 사용
    data: BoardType
}

export interface BoardPageResponse { // 게시글 페이징 처리 시, 사용
    data: BoardPageType;
}

export interface BoardPageType {
    content : BoardData[];
    totalPages : number,
    totalElements : number,
}

export interface BoardData {
    boardId: number;
    title: string;
    code: string;
    oneLineContent: string;
    nickName: string;
    createdAt: Date;
    imageUrl: string;
    category: string;
    prefixCategory: string;
    commentCount: number;
}