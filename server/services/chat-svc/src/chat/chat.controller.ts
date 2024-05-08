import { GrpcMethod } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/Message.dto';
import { Chat } from 'proto/builds/chat_svc';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @GrpcMethod('RoomService', 'AddMessage')
  async addMessage(dto: MessageDto): Promise<Chat> {
    return this.chatService.addMessage(dto);
  }
}
