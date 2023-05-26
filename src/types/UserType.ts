export interface UserResponse {
    data : SignInResponse
}

export interface SignInResponse {
    access_token : string
}

export interface LoginReq {
    email: string,
    password : string
}