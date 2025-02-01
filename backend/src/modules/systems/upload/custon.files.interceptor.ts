import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { Observable } from "rxjs";

@Injectable()
export class CustomFilesInterceptor implements NestInterceptor {
    constructor(@Inject(UploadService) private readonly uploadService: UploadService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const interceptor = new (FilesInterceptor("file", 32, { 
            storage: this.uploadService.storage,
        }))();

        await interceptor.intercept(context, next);
        return next.handle();
    }
}