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