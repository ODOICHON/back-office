interface Comment {
  content : CommentType[]
  };

  export default Comment

  export interface CommentType {
    comment_id : number,
    level : number,
    content : string,
    nick_name : string,
    create_at : string
  }

  export interface CommentReq {
    record_id : number;
    parent_id: any;
    content : string;
  }

  export interface CommentCreateResponse { // 댓글 단일 변경 혹은 조회 시, 사용
    data: number;
}
