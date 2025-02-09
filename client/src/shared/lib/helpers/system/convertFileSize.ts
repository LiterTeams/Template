import { UnitEnumT } from "@app/shared/types/system/types";
import config from "@shared/config/config";

export const convertFileSize = (size: string) => {
    const fileSize = Number(size.split("")[0]);
    if (fileSize == 0) return Infinity;
    const unit = size.split("")[1] as UnitEnumT;
    return Math.ceil(fileSize * config.sizes[unit]);
}