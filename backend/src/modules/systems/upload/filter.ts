import { HttpException } from "@nestjs/common";

import checkFileSizeValid from "src/lib/checkFileSizeValid";
import checkFileExtensionValid from "src/lib/checkFileExtensionValid";
import fileDestructurization from "src/lib/fileDestructurization";

import errors from "src/const/errors";

import { FileProps } from "src/types/system/file.interfaces";

const Filter = (req: any, file: FileProps, callback: any) => {
    const { extension, size } = fileDestructurization(file);

    if (!checkFileExtensionValid(extension)) return callback(new HttpException(errors.extension.message, errors.extension.status), false);
    if (!checkFileSizeValid(size, extension)) return callback(new HttpException(errors.size.message, errors.size.status), false);
    
    callback(null, true);
};

export default Filter;