import { UnitEnumT } from "@app/shared/types/system/types";
import config from "@shared/config/config";
const formatFileSize = (fileSize: number, unit: UnitEnumT = "MB"): string => {
    const unitSize = config.sizes[unit];
    return `${String(Math.ceil(fileSize / unitSize).toFixed(2))} ${unit}`;
}
export default formatFileSize;