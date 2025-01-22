import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import errors from "src/const/errors";

import checkFileSizeValid from "src/lib/checkFileSizeValid";
import checkFileExtensionValid from "src/lib/checkFileExtensionValid";
import fileDestructurization from "src/lib/fileDestructurization";

import { FileIF } from "src/interfaces/system/file.interfaces";

@Injectable()
export class FileValidationPipe implements PipeTransform {
    transform(files: FileIF[]) {
        const validFiles: FileIF[] = [];

        if (!files) throw new BadRequestException('Файл не загружен');

        files.forEach(file => {
            const { extension, size, path } = fileDestructurization(file);
            file.path = path;
            const extensionValid = checkFileExtensionValid(extension);
            const sizeValid = checkFileSizeValid(size,extension);
            
            if (!extensionValid) throw new BadRequestException(errors.extension);
            if (!sizeValid) throw new BadRequestException(errors.size);

            if (extensionValid && sizeValid) validFiles.push(file);
        });
        return validFiles;
    }
}