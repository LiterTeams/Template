import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

@Catch(Error)
export class MulterExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        if (exception.message.includes("size invalid")) {
            return response.status(400).json({ message: "Файл слишком большой" });
        }
        if (exception.message.includes("mimetype invalid")) {
            return response.status(400).json({ message: "Неверный формат файла" });
        }

        return response.status(403).json({ message: exception.message });
    }
}
