/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "chat_svc";

export interface Chat {
  id: number;
  message: string;
  userId: number;
  roomId: string;
}

export interface Message {
  message: string;
  userId: number;
  roomId: string;
}

export const CHAT_SVC_PACKAGE_NAME = "chat_svc";

export interface ChatServiceClient {
  addMessage(request: Message): Observable<Chat>;
}

export interface ChatServiceController {
  addMessage(request: Message): Promise<Chat> | Observable<Chat> | Chat;
}

export function ChatServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["addMessage"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ChatService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ChatService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CHAT_SERVICE_NAME = "ChatService";
