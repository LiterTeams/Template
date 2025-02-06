import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { PrismaExceptionFilter } from "./modules/systems/prisma/prisma.exception.filter";
import * as express from "express";
import { join } from "path";
import * as cookieParser from "cookie-parser";
import { SessionService } from "./modules/systems/session/session.service";
import { HttpExceptionFilter } from "./filters/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const { httpAdapter } = app.get(HttpAdapterHost);
    const sessionService = app.get(SessionService);
    const prefix = configService.get<string>("prefix", "api");
    const allowedOrigins = configService.get<string>("allowedOrigins", "http://localhost:3000,http://localhost:4000").split(",");
    
    app.use(sessionService.getSessionMiddleware());
    app.use(cookieParser(configService.getOrThrow<string>("cookiesSecret")))
    app.use("/uploads", express.static(join(process.cwd(), "uploads")));
    app.setGlobalPrefix(prefix);
    if (httpAdapter) app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));
    app.useGlobalFilters(new HttpExceptionFilter());
    
    app.enableCors({
        origin: allowedOrigins,
        allowedHeaders: ["Content-Type", "Origin", "X-Requested-With", "Accept", "Authorization", "Role"],
        exposedHeaders: ["Authorization","Set-Cookies"],
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
    });
    
    const port = configService.get<number>("port", 5000);
    await app.listen(port);
}
bootstrap();
