import { FileIF } from "src/interfaces/system/file.interfaces";

const fileDestructurization = (file: FileIF) => {
    const path = file.path ? file.path.replaceAll(/\\/g, "/") : "";
    const size = file.size;
    const extension = file.originalname.split(".").pop();
    const name = file.filename ? file.filename.split(`.${extension}`)[0] : file.originalname.split(`.${extension}`)[0];
    const original_name = file.originalname.split(`.${extension}`)[0];
    return { name, original_name, size, extension, path }
}

export default fileDestructurization;