import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { rpcErrorHandling$ } from 'lib/utils/rpcErrorHandling';
import {
  CHAT_SERVICE_NAME,
  Chat,
  ChatServiceClient,
  Message,
} from 'proto/builds/chat_svc';

@Injectable()
export class ChatSvcService implements OnModuleInit {
  private chatClient: ChatServiceClient;
  constructor(@Inject(CHAT_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.chatClient =
      this.client.getService<ChatServiceClient>(CHAT_SERVICE_NAME);
  }

  async addMessage(dto: Message): Promise<Chat> {
    const observableChat$ = this.chatClient.addMessage(dto);
    const chat = rpcErrorHandling$(observableChat$);

    return chat;
  }
}
