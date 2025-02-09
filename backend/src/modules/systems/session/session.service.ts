import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as session from "express-session";
import { RedisStore } from "connect-redis";
import { RedisService } from "../redis/redis.service";
import timeToMs from "src/lib/timeToMs";
import Redis from "ioredis";
import { CookieOptions, Response } from "express";

import errors from "src/const/errors";
import timeToSeconds from "src/lib/timeToSeconds";

@Injectable()
export class SessionService {
  private readonly redisClient: Redis;
  private readonly sessionSecret: string;
  private readonly sessionName: string;
  private readonly sessionFolder: string;
  private readonly cookieOptions: CookieOptions;
  private readonly sessionMaxAge: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = this.redisService.getClient();
    this.sessionSecret = this.configService.get<string>("sessionSecret");
    this.sessionName = this.configService.get<string>("sessionName");
    this.sessionFolder = this.configService.get<string>("sessionFolder");
    this.sessionMaxAge = timeToSeconds(this.configService.get<string>("sessionMaxAge"));
    this.cookieOptions = {
      domain: this.configService.get<string>("sessionDomain"),
      maxAge: timeToMs(this.configService.get<string>("sessionMaxAge")),
      httpOnly: this.configService.get<boolean>("sessionHTTPOnly", true),
      secure: this.configService.get<boolean>("sessionSecure", true),
      sameSite: this.configService.get<string>("sessionSameSite", "lax") as "lax" | "strict" | "none",
    }
  }

  public getSessionMiddleware() {
    return session({
      secret: this.sessionSecret,
      name: this.sessionName,
      resave: true,
      saveUninitialized: false,
      cookie: this.cookieOptions,
      store: new RedisStore({
        client: this.redisClient,
        prefix: this.sessionFolder,
      }),
    });
  }

  async getSession(userId: string | number): Promise<any> {
    const session = await this.redisService.get(`session:${userId}`);
    if (!session) throw new InternalServerErrorException(errors.sessionEmpty.message);
    return JSON.parse(session);
  }

  async saveSession(userId: string | number, data: any, res: Response): Promise<void> {
    const sessionId = `session:${userId}`;
    const jsonData = JSON.stringify({sessionId: userId, ...data});
    await this.redisService.set(sessionId, jsonData, this.sessionMaxAge);
    res.cookie("session", jsonData, this.cookieOptions);
  }

  async destroySession(userId: string | number): Promise<void> {
    try{
      await this.redisService.del(`session:${userId}`);
    } catch(error) {
      throw new InternalServerErrorException(errors.sessionDestroy.message);
    }
  }
}
