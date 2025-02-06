import { Injectable } from '@nestjs/common';
import Redis from "ioredis";
import { InjectRedis } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService,
) {}

  getClient(): Redis { return this.redis; }

  async set(key: string, value: string, TTL?: number): Promise<void> {
    if (TTL !== undefined && TTL > 0) await this.redis.set(key, value, "EX", TTL);
    else await this.redis.set(key, value);
  }

  async get(key: string): Promise<string | null> { return await this.redis.get(key); }

  async del(key: string): Promise<boolean> {
    const result = await this.redis.del(key);
    return result === 1;
  }

  async timeToLife(key: string): Promise<number> {
    return await this.redis.ttl(key);
  }

  async exists(key: string): Promise<boolean> { return await this.redis.exists(key) === 1; }

  async blacklistToken(token: string, TTL: number): Promise<void> { await this.set(`blacklist:${token}`, "true", TTL); }

  async isTokenBlacklisted(token: string): Promise<boolean> { return (await this.get(`blacklist:${token}`)) === "true"; }
}
