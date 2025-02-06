import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as session from "express-session";
import { RedisStore } from "connect-redis";
import { RedisService } from "../redis/redis.service";
import timeToMs from "src/lib/timeToMs";
import Redis from "ioredis";

@Injectable()
export class SessionService {
  private readonly redisClient: Redis;
  private readonly sessionSecret: string;
  private readonly sessionName: string;
  private readonly sessionDomain: string;
  private readonly sessionMaxAge: string;
  private readonly sessionFolder: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = this.redisService.getClient();
    this.sessionSecret = this.configService.get<string>("sessionSecret");
    this.sessionName = this.configService.get<string>("sessionName");
    this.sessionDomain = this.configService.get<string>("sessionDomain");
    this.sessionMaxAge = this.configService.get<string>("sessionMaxAge");
    this.sessionFolder = this.configService.get<string>("sessionFolder");
  }

  getSessionMiddleware() {
    return session({
      secret: this.sessionSecret,
      name: this.sessionName,
      resave: true,
      saveUninitialized: false,
      cookie: {
        domain: this.sessionDomain,
        maxAge: timeToMs(this.sessionMaxAge),
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
      store: new RedisStore({
        client: this.redisClient,
        prefix: this.sessionFolder,
      }),
    });
  }
}
