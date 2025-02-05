import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [MailerModule],
  providers: [MailService],
})
export class MailModule {}
