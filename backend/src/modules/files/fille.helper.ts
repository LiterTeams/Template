import { HttpException } from "@nestjs/common";
import fileConfig from 'src/const/fileConfig';
import checkFileSize from "src/lib/checkFileSize";

const extensions = fileConfig.file.extensions;

export const fileFilterHelper = (req: any, file: Express.Multer.File, callback: any) => {

    const extension = file.originalname.split(".").pop();

    if (extensions.includes(extension)) return callback(new HttpException(`File Extension Not Supported! - [${file.originalname}]`, 400), false);

    return callback(null, true);

}