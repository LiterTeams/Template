import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import Redis from "ioredis";
import { InjectRedis } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';
import timeToSeconds from 'src/lib/timeToSeconds';

@Injectable()
export class RedisService {
  private readonly expireRefreshJWT: number;

  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly configService: ConfigService,
) {
  this.expireRefreshJWT = timeToSeconds(this.configService.get<string>("expireRefreshJWT"));
}

  getClient(): Redis { return this.redis; }

  async set(key: string, value: string, TTL?: number): Promise<void> {
    if (TTL !== undefined && TTL > 0) await this.redis.set(key, value, "EX", TTL);
    else await this.redis.set(key, value);
  }

  public async getRefreshToken(userId: string | number) {
    try{
      return await this.redis.get(`refresh:${userId}`);
    } catch(error){
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
  public async getRefreshTokenTTL(userId: string | number) {
    try{
      return await this.timeToLife(`refresh:${userId}`);
    } catch(error){
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
  public async setRefreshToken(userId: string | number, newRefreshToken: string, TTL?: number): Promise<void>{
    TTL = TTL || this.expireRefreshJWT;
    await this.redis.set(`refresh:${userId}`, newRefreshToken, "EX", TTL);
  }
  public async removeRefreshToken(userId: string | number): Promise<void> {
    try{
      await this.redis.del(`refresh:${userId}`);
    } catch(error){
      throw new InternalServerErrorException("Не удалось выйти из системы. Возможно ошибка на сервере");
    }
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
