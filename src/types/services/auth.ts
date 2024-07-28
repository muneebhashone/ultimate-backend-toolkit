export interface LoginUser {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginUserReturn {
  accessToken: string;
  refreshToken: string;
}
