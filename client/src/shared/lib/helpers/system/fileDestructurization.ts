import { ExtensionsPropsT } from "@app/shared/types/system/types";

const fileDestructurization = (file: File) => {
    const size = file.size;
    const extension = file.name.split(".").pop() as ExtensionsPropsT;
    const name = file.name.split(`.${extension}`)[0];
    return { name, size, extension };
}

export default fileDestructurization;
