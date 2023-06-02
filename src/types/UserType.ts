export interface UserResponse {
    code : string;
    message :string;
    data : SignInResponse;
}

export interface SignInResponse {
    access_token : string
}

export interface LoginReq {
    email: string,
    password : string
}

export interface UserInfoResponse {
    code : string;
    message: string;
    data : UserInfoRes
}

export interface UserInfoRes {
    id : number;
    email : string;
    nick_name : string;
    phone_num : string;
    authority : string;
    age: string;
}