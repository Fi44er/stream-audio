/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user_svc";

export enum Role {
  USER = 0,
  ADMIN = 1,
  UNRECOGNIZED = -1,
}

export interface CreateUserReq {
  email: string;
  password: string;
}

export interface FindUSerReq {
  idOrEmail: string;
}

export interface UserRes {
  id: number;
  email: string;
  password: string;
  role: string;
}

export interface AccessToken {
  token: string;
  exp: number;
}

export interface AccessTokenRes {
  accessToken: AccessToken | undefined;
}

/** ----- Register ----- // */
export interface RegisterReq {
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface StatusRes {
  status: boolean;
}

export interface VerifyCodeBody {
  email: string;
  password: string;
  code: number;
}

export interface VerifyCodeReq {
  body: VerifyCodeBody | undefined;
  agent: string;
}

/** ----- Login ----- // */
export interface LoginReq {
  email: string;
  password: string;
}

/** ----- Logout ----- // */
export interface LogoutReq {
  id: number;
  agent: string;
}

/** ----- Refresh ----- // */
export interface RefreshingReq {
  accessToken: AccessToken | undefined;
  agent: string;
}

export const USER_SVC_PACKAGE_NAME = "user_svc";

export interface UserServiceClient {
  createUser(request: CreateUserReq): Observable<UserRes>;

  findUser(request: FindUSerReq): Observable<UserRes>;

  register(request: RegisterReq): Observable<StatusRes>;

  verifyCode(request: VerifyCodeReq): Observable<AccessTokenRes>;

  login(request: LoginReq): Observable<StatusRes>;

  logout(request: LogoutReq): Observable<StatusRes>;

  refreshingToken(request: RefreshingReq): Observable<AccessTokenRes>;
}

export interface UserServiceController {
  createUser(request: CreateUserReq): Promise<UserRes> | Observable<UserRes> | UserRes;

  findUser(request: FindUSerReq): Promise<UserRes> | Observable<UserRes> | UserRes;

  register(request: RegisterReq): Promise<StatusRes> | Observable<StatusRes> | StatusRes;

  verifyCode(request: VerifyCodeReq): Promise<AccessTokenRes> | Observable<AccessTokenRes> | AccessTokenRes;

  login(request: LoginReq): Promise<StatusRes> | Observable<StatusRes> | StatusRes;

  logout(request: LogoutReq): Promise<StatusRes> | Observable<StatusRes> | StatusRes;

  refreshingToken(request: RefreshingReq): Promise<AccessTokenRes> | Observable<AccessTokenRes> | AccessTokenRes;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createUser",
      "findUser",
      "register",
      "verifyCode",
      "login",
      "logout",
      "refreshingToken",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
