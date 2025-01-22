import { HttpException } from "@nestjs/common";

import checkFileSizeValid from "src/lib/checkFileSizeValid";
import checkFileExtensionValid from "src/lib/checkFileExtensionValid";
import fileDestructurization from "src/lib/fileDestructurization";

import errors from "src/const/errors";

import { FileIF } from "src/interfaces/system/file.interfaces";

const Filter = (req: any, file: FileIF, callback: any) => {
    const { extension, size } = fileDestructurization(file);
    
    const extensionValid = checkFileExtensionValid(extension);
    const sizeValid = checkFileSizeValid(size, extension);
    
    if (!extensionValid) return callback(new HttpException(errors.extension.message, errors.extension.status), false);
    if (!sizeValid) return callback(new HttpException(errors.size.message, errors.size.status), false);
    return callback(null, true);
}

export default Filter;