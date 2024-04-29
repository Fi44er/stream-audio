import { EmailerService } from 'src/mailer/emailer.service';
import { PrismaService } from 'src/prisma/prisma.service';

interface IServices {
  prismaService: PrismaService;
  emailerService: EmailerService;
}
export const generateAndSendVerifyCode = async (
  email: string,
  services: IServices,
) => {
  const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  await services.emailerService.sendEmail({ code, email: email });

  await services.prismaService.verificationCode.upsert({
    where: { email: email },
    update: {
      code,
      createdAt: new Date(Date.now()),
    },
    create: {
      code,
      email: email,
      createdAt: new Date(Date.now()),
    },
  });
};
