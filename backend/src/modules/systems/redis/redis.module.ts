import { Module } from "@nestjs/common";
import { RedisModule as Redis } from "@nestjs-modules/ioredis";
import { RedisService } from "./redis.service";

@Module({
  imports: [
    Redis.forRoot({
        type: "single",
        options: {
          host: "localhost",
          port: 6379,
          password: "123456",
        }
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
