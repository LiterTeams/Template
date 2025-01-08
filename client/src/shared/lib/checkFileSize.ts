import { UnitEnumT } from "@entities/types/enum.types";
import files from "@entities/config/files";

const checkFileSize = (fileSize: number ,min:string = "0 MB", max:string = "0 MB") => {
    const units = {min:files.sizes[min.split(" ")[1] as UnitEnumT], max:files.sizes[max.split(" ")[1] as UnitEnumT]}
    
    const minSize = units.min * Number(min.split(" ")[0]);
    const maxSize = units.max * Number(max.split(" ")[0]);
    
    if (minSize + maxSize === 0) return true;
    if(minSize >= 0 && maxSize > 0) return fileSize >= minSize && fileSize <= maxSize;
    if(min) return fileSize <= minSize;
    if(max) return fileSize >= maxSize;
    
    return true;
}

export default checkFileSize;