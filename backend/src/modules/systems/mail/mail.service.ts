import { Injectable } from "@nestjs/common";
import { ResendService } from "nestjs-resend";

@Injectable()
export class MailService {

  private readonly mailFrom = "literteams@gmail.com";

  constructor(private readonly resendService: ResendService) {}

  async send(recipient: string){
    return await this.resendService.send({
      from: this.mailFrom,
      to: recipient,
      subject: "Hellow World",
      text: "Test Send Email Service",
    })
  }

}
