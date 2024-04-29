/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'user_svc';

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

export interface VerifyCodeRes {
  accessToken: AccessToken | undefined;
}

/** ----- Register ----- // */
export interface RegisterReq {
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface RegisterRes {
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
  token: string;
}

export interface LogoutRes {
  status: boolean;
}

export const USER_SVC_PACKAGE_NAME = 'user_svc';

export interface UserServiceClient {
  createUser(request: CreateUserReq): Observable<UserRes>;

  findUser(request: FindUSerReq): Observable<UserRes>;

  register(request: RegisterReq): Observable<RegisterRes>;

  verifyCode(request: VerifyCodeReq): Observable<VerifyCodeRes>;

  login(request: LoginReq): Observable<RegisterRes>;

  logout(request: LogoutReq): Observable<LogoutRes>;
}

export interface UserServiceController {
  createUser(
    request: CreateUserReq,
  ): Promise<UserRes> | Observable<UserRes> | UserRes;

  findUser(
    request: FindUSerReq,
  ): Promise<UserRes> | Observable<UserRes> | UserRes;

  register(
    request: RegisterReq,
  ): Promise<RegisterRes> | Observable<RegisterRes> | RegisterRes;

  verifyCode(
    request: VerifyCodeReq,
  ): Promise<VerifyCodeRes> | Observable<VerifyCodeRes> | VerifyCodeRes;

  login(
    request: LoginReq,
  ): Promise<RegisterRes> | Observable<RegisterRes> | RegisterRes;

  logout(
    request: LogoutReq,
  ): Promise<LogoutRes> | Observable<LogoutRes> | LogoutRes;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createUser',
      'findUser',
      'register',
      'verifyCode',
      'login',
      'logout',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';
