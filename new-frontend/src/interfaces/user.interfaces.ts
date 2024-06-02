export interface IStatus {
  status: boolean;
}

export interface ILoginReq {
  email: string;
  password: string;
}

export interface IVerifyCodeReq {
  email: string;
  password: string;
  code: string;
}

export interface IRegisterReq {
  email: string;
  password: string;
  passwordRepeat: string;
}
