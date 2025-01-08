import { UnitEnumT } from "@entities/types/enum.types";
import files from "@entities/config/files";
const fileSizeConvert = (fileSize: number, unit: UnitEnumT = "MB"): string => {
    const unitSize = files.sizes[unit];
    return `${String(Math.ceil(fileSize / unitSize).toFixed(2))} ${unit}`;
}
export default fileSizeConvert;