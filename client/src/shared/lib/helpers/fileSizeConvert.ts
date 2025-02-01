import { UnitEnumT } from "@shared/types/enum.types";
import config from "@shared/config/config";
const fileSizeConvert = (fileSize: number, unit: UnitEnumT = "MB"): string => {
    const unitSize = config.sizes[unit];
    return `${String(Math.ceil(fileSize / unitSize).toFixed(2))} ${unit}`;
}
export default fileSizeConvert;