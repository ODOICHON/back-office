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