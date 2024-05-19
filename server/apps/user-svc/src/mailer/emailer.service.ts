import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({ code, email }: ISendEmail): Promise<string> {
    await this.mailerService.sendMail({
      to: email, // Specify the recipient email address here
      subject: 'Verification code',
      template: 'letter',
      context: {
        code,
      },
    });
    return 'email sent';
  }
}
