import { ExtensionsEnumT } from "@entities/types/enum.types";

const checkFileFormat = (fileFormat: ExtensionsEnumT, checkFormat: ExtensionsEnumT[]):boolean => checkFormat.includes(fileFormat);

export default checkFileFormat;